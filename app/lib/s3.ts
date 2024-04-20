// s3Utils.ts
import AWS from 'aws-sdk';

// Configure AWS S3 using environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = 'sxsw-zine-bucket';

type S3File = {
  name: string;
  url: string;
};

/**
 * Generate a presigned URL for a file in the S3 bucket.
 * @param fileName The name of the file for which to generate a presigned URL.
 */
export const getPresignedUrl = async (fileName: string): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 3 * 24 * 60 * 60, // Expires in three days (in seconds)
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error(`Failed to generate presigned URL for ${fileName}:`, error);
    throw new Error('Could not generate presigned URL');
  }
};

/**
 * List all files in the S3 bucket.
 * Returns an array of objects containing the name and presigned URL of each file.
 */
export const listFiles = async (): Promise<S3File[]> => {
  try {
    const { Contents } = await s3
      .listObjectsV2({ Bucket: bucketName })
      .promise();
    if (!Contents) {
      console.log('No files found in the bucket.');
      return [];
    }

    const filesWithPresignedUrls = await Promise.all(
      Contents.map(async (file) => {
        if (!file.Key) {
          return null; // Skip files without a key
        }
        const url = await getPresignedUrl(file.Key);
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
