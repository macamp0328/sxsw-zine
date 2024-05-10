// s3Utils.ts

import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure AWS S3 using environment variables
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },

  region: process.env.AWS_REGION,
});

const bucketName = 'sxsw-zine-bucket';
const cloudfrontDistributionUrl = 'https://d2qb1jexhp0efc.cloudfront.net';

type S3File = {
  name: string;
  url: string;
};

/**
 * Generate a presigned URL for a file in the S3 bucket.
 * @param fileName The name of the file for which to generate a presigned URL.
 */
// export const getPresignedUrl = async (fileName: string): Promise<string> => {
//   const params = {
//     Bucket: bucketName,
//     Key: fileName,
//     Expires: 10 * 24 * 60 * 60, // Expires in ten days (in seconds)
//   };

//   try {
//     const url = await getSignedUrl(s3, new GetObjectCommand(params), {});
//     return url;
//   } catch (error) {
//     console.error(`Failed to generate presigned URL for ${fileName}:`, error);
//     throw new Error('Could not generate presigned URL');
//   }
// };

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
