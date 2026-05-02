import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Readable } from 'stream';

import { getBandDownloadDetails } from '@/app/lib/actions';
import { getFileMetadata } from '@/app/lib/blobs';
import { getS3Env, getStorageType, MissingEnvError } from '@/app/lib/env';
import { readLocalFile } from '@/app/lib/local-files';
import { isRateLimited } from '@/app/lib/rate-limit';
import { getS3Client } from '@/app/lib/s3';
import { createZipStream } from '@/app/lib/zip-stream';

const MAX_DOWNLOAD_FILES = 40;
const MAX_DOWNLOAD_BYTES = 300 * 1024 * 1024;

type DownloadEntry = {
  filename: string;
  size: number;
  stream: () => Promise<AsyncIterable<Uint8Array>>;
};

const sanitizeFilenamePart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'sxsw-band';

const isValidRequestBody = (value: unknown): value is { bandId: string } => {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as { bandId?: unknown }).bandId === 'string'
  );
};

async function* bufferToAsyncIterable(buffer: Buffer) {
  yield new Uint8Array(buffer);
}

async function* webStreamToAsyncIterable(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();

  try {
    /* eslint-disable no-await-in-loop -- Web stream readers expose chunks one read at a time. */
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        yield value;
      }
    }
    /* eslint-enable no-await-in-loop */
  } finally {
    reader.releaseLock();
  }
}

const getDownloadEntry = async (
  filename: string,
  storageType: ReturnType<typeof getStorageType>,
): Promise<DownloadEntry> => {
  if (storageType === 'local') {
    const buffer = await readLocalFile(filename);
    return {
      filename,
      size: buffer.byteLength,
      stream: async () => bufferToAsyncIterable(buffer),
    };
  }

  if (storageType === 's3') {
    const { bucketName } = getS3Env();
    const headCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });
    const { ContentLength } = await getS3Client().send(headCommand);

    return {
      filename,
      size: ContentLength || 0,
      stream: async () => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: filename,
        });
        const { Body } = await getS3Client().send(command);
        if (!Body) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        return Body as Readable;
      },
    };
  }

  const metadata = await getFileMetadata(filename);
  return {
    filename,
    size: metadata.size,
    stream: async () => {
      const response = await fetch(metadata.downloadUrl || metadata.url);
      if (!response.ok || !response.body) {
        throw new Error(`Failed to fetch ${filename}`);
      }
      return webStreamToAsyncIterable(response.body);
    },
  };
};

export async function POST(req: NextRequest) {
  try {
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (
      isRateLimited(`download-images:${ipAddress}`, {
        limit: 12,
        windowMs: 60_000,
      })
    ) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body: unknown = await req.json();
    if (!isValidRequestBody(body)) {
      return NextResponse.json({ error: 'Invalid bandId' }, { status: 400 });
    }

    const { bandId } = body;
    const { bandName, filenames } = await getBandDownloadDetails(bandId);

    if (!filenames.length) {
      return NextResponse.json(
        { error: 'No downloadable images found for this band' },
        { status: 404 },
      );
    }

    if (filenames.length > MAX_DOWNLOAD_FILES) {
      return NextResponse.json(
        { error: 'Too many files requested for one download' },
        { status: 413 },
      );
    }

    const storageType = getStorageType();
    const entries: DownloadEntry[] = [];
    let totalBytes = 0;

    /* eslint-disable no-await-in-loop -- Preflight entries sequentially so byte caps are enforced before the zip response starts. */
    for (const filename of filenames) {
      const entry = await getDownloadEntry(filename, storageType);
      totalBytes += entry.size;
      if (totalBytes > MAX_DOWNLOAD_BYTES) {
        return NextResponse.json(
          { error: 'Download is too large' },
          { status: 413 },
        );
      }
      entries.push(entry);
    }
    /* eslint-enable no-await-in-loop */

    const response = new NextResponse(createZipStream(entries), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${sanitizeFilenamePart(
          bandName,
        )}-miles-sxsw.zip"`,
      },
    });

    return response;
  } catch (error) {
    console.error('Failed to create zip file', error);

    if (error instanceof MissingEnvError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (error instanceof Error && error.message === 'Band not found') {
      return NextResponse.json({ error: 'Band not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to create zip file' },
      { status: 500 },
    );
  }
}
