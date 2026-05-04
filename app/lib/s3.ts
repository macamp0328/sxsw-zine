import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

import { getS3Env } from '@/app/lib/env';

let s3: S3Client | null = null;

export function getS3Client(): S3Client {
  if (!s3) {
    const { accessKeyId, region, secretAccessKey } = getS3Env();
    s3 = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
  }

  return s3;
}

type S3File = {
  name: string;
  url: string;
};

/**
 * List all files in the S3 bucket.
 * Returns an array of objects containing the name and presigned URL of each file.
 */
export const listFiles = async (): Promise<S3File[]> => {
  try {
    const { bucketName, cloudfrontDistributionUrl } = getS3Env();
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const { Contents } = await getS3Client().send(command);
    // const { Contents } = await s3.listObjectsV2({ Bucket: bucketName });
    if (!Contents) {
      console.error('No files found in the bucket.');
      return [];
    }

    const filesWithPresignedUrls = await Promise.all(
      Contents.map(async (file) => {
        if (!file.Key) {
          return null; // Skip files without a key
        }
        const url = `${cloudfrontDistributionUrl}/${file.Key}`;
        return { name: file.Key, url };
      }),
    );

    // Filter out any potential undefined or null results from async operations (though there should be none)
    return filesWithPresignedUrls.filter((file) => file != null) as S3File[];
  } catch (error) {
    console.error('Failed to list files:', error);
    throw new Error('Could not retrieve files');
  }
};
