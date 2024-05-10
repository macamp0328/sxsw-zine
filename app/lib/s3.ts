import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

// Configure AWS S3 using environment variables
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },

  region: process.env.AWS_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME || '';
const cloudfrontDistributionUrl = process.env.AWS_CLOUDFRONT_DOMAIN || '';

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
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const { Contents } = await s3.send(command);
    // const { Contents } = await s3.listObjectsV2({ Bucket: bucketName });
    if (!Contents) {
      console.log('No files found in the bucket.');
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
