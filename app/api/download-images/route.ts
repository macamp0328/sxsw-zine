import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

import { getBandFilenames } from '@/app/lib/actions'; // Import the function to get filenames

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  const { bandId } = await req.json();

  try {
    const filenames = await getBandFilenames(bandId);
    const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

    const fetchPromises = filenames.map(async (filename: string) => {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
      });
      const { Body } = await s3.send(command);
      if (Body instanceof Readable) {
        const buffer = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = [];
          Body.on('data', (chunk) => chunks.push(chunk));
          Body.on('end', () => resolve(Buffer.concat(chunks)));
          Body.on('error', reject);
        });

        await zipWriter.add(filename, new BlobReader(new Blob([buffer])));
      }
    });

    await Promise.all(fetchPromises);

    const zipBlob = await zipWriter.close();
    const zipBuffer = await zipBlob.arrayBuffer();

    const response = new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${bandId}-miless-sxsw.zip`,
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
