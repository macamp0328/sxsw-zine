import { GetObjectCommand } from '@aws-sdk/client-s3';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Readable } from 'stream';

import { getBandDownloadDetails } from '@/app/lib/actions';
import { getS3Env, getStorageType, MissingEnvError } from '@/app/lib/env';
import { readLocalFile } from '@/app/lib/local-files';
import { isRateLimited } from '@/app/lib/rate-limit';
import { getS3Client } from '@/app/lib/s3';

const MAX_DOWNLOAD_FILES = 40;
const MAX_DOWNLOAD_BYTES = 300 * 1024 * 1024;

// Helper function to convert Node.js stream to Buffer
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
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

    // Fetch files and convert streams to Buffers
    const storageType = getStorageType();
    const files: { filename: string; buffer: Buffer }[] = [];
    let totalBytes = 0;

    /* eslint-disable no-await-in-loop -- Keep downloads sequential so byte caps are enforced before fetching more originals. */
    for (const filename of filenames) {
      if (storageType === 'local') {
        const buffer = await readLocalFile(filename);
        totalBytes += buffer.byteLength;
        if (totalBytes > MAX_DOWNLOAD_BYTES) {
          return NextResponse.json(
            { error: 'Download is too large' },
            { status: 413 },
          );
        }
        files.push({ filename, buffer });
      } else if (storageType === 's3') {
        const { bucketName } = getS3Env();
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: filename,
        });
        const { Body, ContentLength } = await getS3Client().send(command);
        if (!Body) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        totalBytes += ContentLength || 0;
        if (totalBytes > MAX_DOWNLOAD_BYTES) {
          return NextResponse.json(
            { error: 'Download is too large' },
            { status: 413 },
          );
        }
        const buffer = await streamToBuffer(Body as Readable);
        files.push({ filename, buffer });
      } else {
        return NextResponse.json(
          { error: 'Downloads are only supported for local and S3 storage' },
          { status: 501 },
        );
      }
    }
    /* eslint-enable no-await-in-loop */

    // Create zip writer
    const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

    // Add files to zip
    await Promise.all(
      files.map(({ filename, buffer }) =>
        zipWriter.add(filename, new BlobReader(new Blob([buffer]))),
      ),
    );

    // Close zip and get buffer
    const zipBlob = await zipWriter.close();
    const zipBuffer = await zipBlob.arrayBuffer();
    const zipSize = zipBuffer.byteLength;

    // Create response
    const response = new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${sanitizeFilenamePart(
          bandName,
        )}-miles-sxsw.zip"`,
        'Content-Length': zipSize.toString(),
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
