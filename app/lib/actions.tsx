import {
  type Band,
  type Picture,
  PrismaClient,
  type Venue,
} from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

import { listFiles as listBlobFiles } from './blobs';
import { listFiles as listS3Files } from './s3';

// const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
const prisma = new PrismaClient();

// Define a type that reflects the structure including relationships
export type PictureWithRelationsAndUrl = Picture & {
  band: Band | null; // Assuming Band can be null
  venue: Venue | null; // Assuming Venue can be null
  url?: string | null; // Added property for the blob URL
};

const listFiles = async () => {
  if (process.env.STORAGE_TYPE === 's3') {
    return listS3Files();
  }
  return listBlobFiles();
};

// gets all zine pictures, which would be featured on main page
export async function getZinePictures(): Promise<PictureWithRelationsAndUrl[]> {
  noStore();
  try {
    const pictures = await prisma.picture.findMany({
      where: { isZine: true },
      include: { band: true, venue: true },
    });

    const files = await listFiles();
    const fileMap = new Map(files.map((file) => [file.name, file.url]));

    const picturesWithUrls = pictures.map((picture) => ({
      ...picture,
      url: fileMap.get(picture.filename) || null,
    }));

    return picturesWithUrls;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Update the function to accept a boolean flag for fetching Blob URLs
export async function getPictureDetails(
  bandSlug: string,
  fetchBlobUrl: boolean = false,
): Promise<PictureWithRelationsAndUrl | null> {
  noStore();
  try {
    const picture = await prisma.picture.findFirst({
      where: { band: { slug: bandSlug } },
      include: { band: true, venue: true },
    });

    if (picture && fetchBlobUrl) {
      const files = await listFiles();
      const fileMap = new Map(files.map((file) => [file.name, file.url]));
      const url = fileMap.get(picture.filename) || null; // Assuming 'filename' is a field in the Picture model
      return { ...picture, url }; // Return the picture with the URL
    }

    return picture; // Return the picture without URL if not requested
  } catch (e) {
    console.error(e);
    throw e;
  }
}
