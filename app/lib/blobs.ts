// blobUtils.ts
import type { ListBlobResultBlob } from '@vercel/blob';
import { list } from '@vercel/blob';

type BlobFile = {
  name: string;
  url: string;
  downloadUrl: string;
};

/**
 * List all files in the blob storage.
 * Returns an array of objects containing the name, public URL, and direct download URL of each file.
 */
export const listFiles = async (): Promise<BlobFile[]> => {
  try {
    const result = await list();
    return result.blobs.map((file: ListBlobResultBlob) => ({
      name: file.pathname,
      url: file.url,
      downloadUrl: file.downloadUrl,
    }));
  } catch (error) {
    console.error('Failed to list files:', error);
    throw new Error('Could not retrieve files');
  }
};

/**
 * Get metadata for a specific file in the blob storage, including its public URL and direct download URL.
 * @param pathname The pathname of the file for which to retrieve metadata.
 */
// export const getFileMetadata = async (pathname: string): Promise<BlobFile> => {
// kept getting the following error, adboning for now
/**
 * Failed to retrieve metadata for r0055134: BlobError: Vercel Blob: Url is malformed
 * at getBlobError (C:\Dev\sxsw-zine\.next\server\chunks\node_modules_ed1213._.js:2673:21)
 */
// const encodedPathname = encodeURI(pathname);
// console.log(`Getting metadata for encoded file: ${encodedPathname}`);
// try {
//   const metadata: HeadBlobResult = await head(encodedPathname);
//   return {
//     name: metadata.pathname,
//     url: metadata.url,
//     downloadUrl: metadata.downloadUrl,
//   };
// } catch (error) {
//   console.error(`Failed to retrieve metadata for ${encodedPathname}:`, error);
//   throw new Error('Could not retrieve file metadata');
// }
// };
