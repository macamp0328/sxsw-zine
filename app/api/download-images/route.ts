import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Readable } from 'stream';

import { getBandFilenames } from '@/app/lib/actions';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Helper function to convert Node.js stream to Buffer
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

export async function POST(req: NextRequest) {
  const { bandId, bandName } = await req.json();

  try {
    const filenames = await getBandFilenames(bandId);

    // Fetch files and convert streams to Buffers
    const files = await Promise.all(
      filenames.map(async (filename: string) => {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: filename,
        });
        const { Body } = await s3.send(command);
        if (!Body) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        const buffer = await streamToBuffer(Body as Readable);
        return { filename, buffer };
      }),
    );

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
        'Content-Disposition': `attachment; filename=${bandName}-miless-sxsw.zip`,
        'Content-Length': zipSize.toString(),
      },
    });

    return response;
  } catch (error) {
    console.error('Failed to create zip file', error);
    return NextResponse.json(
      { error: 'Failed to create zip file' },
      { status: 500 },
    );
  }
}
