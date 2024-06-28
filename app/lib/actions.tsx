'use server';

import {
  type Band,
  type Link,
  type Picture,
  PrismaClient,
  type Venue,
} from '@prisma/client';

import { listFiles as listBlobFiles } from '@/app/lib/blobs';
import { listFiles as listS3Files } from '@/app/lib/s3';

const prisma = new PrismaClient();

/**
 * Fetches filenames of pictures associated with a specific band.
 * @param bandId - The ID of the band.
 * @returns A list of filenames.
 */
export async function getBandFilenames(bandId: string): Promise<string[]> {
  try {
    const pictures = await prisma.picture.findMany({
      where: { bandId },
      select: { filename: true },
    });

    const files = await listS3Files();
    const filenames = pictures.map((picture) => picture.filename);

    return files
      .filter((file) => filenames.includes(file.name))
      .map((file) => file.name);
  } catch (error) {
    console.error('Error fetching band filenames:', error);
    throw new Error('Failed to fetch band filenames');
  }
}

/**
 * Slugifies a given text.
 * @param text - The text to slugify.
 * @returns The slugified text.
 */
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export type NonZinePicture = Picture & {
  url?: string | null;
};

export type PictureWithRelationsAndUrl = Picture & {
  band:
    | (Band & {
        links: Link[];
      })
    | null;
  venue:
    | (Venue & {
        links: Link[];
      })
    | null;
  url?: string | null;
  setSlug: string;
  notZinePictures?: NonZinePicture[];
};

/**
 * Lists files based on the storage type.
 * @returns A list of files.
 */
const listFiles = async () => {
  if (process.env.STORAGE_TYPE === 's3') {
    return listS3Files();
  }
  return listBlobFiles();
};

/**
 * Fetches and maps pictures with their relations and URLs.
 * @returns A list of pictures with relations and URLs.
 */
export async function getZinePictures(): Promise<PictureWithRelationsAndUrl[]> {
  try {
    const zinePictures = await prisma.picture.findMany({
      where: { isZine: true },
      include: {
        band: { include: { links: true } },
        venue: { include: { links: true } },
      },
      orderBy: { takenAt: 'asc' },
    });

    const bandVenuePairs = zinePictures
      .map((picture) => ({
        bandId: picture.bandId,
        venueId: picture.venueId,
      }))
      .filter((pair) => pair.bandId && pair.venueId);

    const nonZinePictures = await prisma.picture.findMany({
      where: {
        isZine: false,
        OR: bandVenuePairs.map((pair) => ({
          bandId: pair.bandId,
          venueId: pair.venueId,
        })),
      },
      include: {
        band: { include: { links: true } },
        venue: { include: { links: true } },
      },
      orderBy: { takenAt: 'asc' },
    });

    const files = await listFiles();
    const fileMap = new Map(files.map((file) => [file.name, file.url]));

    type PictureWithRelations = Picture & {
      band?: Band | null;
      venue?: Venue | null;
    };

    const mapPicturesWithUrls = (pictures: PictureWithRelations[]) =>
      pictures.map((picture) => ({
        ...picture,
        url: fileMap.get(picture.filename) || null,
        setSlug: `${picture.band?.slug}-${slugify(picture.venue?.name || '')}`,
      }));

    const zinePicturesWithUrls = mapPicturesWithUrls(
      zinePictures,
    ) as PictureWithRelationsAndUrl[];
    const nonZinePicturesWithUrls = mapPicturesWithUrls(
      nonZinePictures,
    ) as NonZinePicture[];

    const zinePictureMap = zinePicturesWithUrls.reduce(
      (acc, picture) => {
        const key = `${picture.bandId}-${picture.venueId}`;
        acc[key] = picture;
        return acc;
      },
      {} as Record<string, PictureWithRelationsAndUrl>,
    );

    nonZinePicturesWithUrls.forEach((picture) => {
      const key = `${picture.bandId}-${picture.venueId}`;
      if (zinePictureMap[key]) {
        if (!zinePictureMap[key].notZinePictures) {
          zinePictureMap[key].notZinePictures = [];
        }
        zinePictureMap[key].notZinePictures!.push(picture);
      }
    });

    return Object.values(zinePictureMap);
  } catch (error) {
    console.error('Error fetching zine pictures:', error);
    throw new Error('Failed to fetch zine pictures');
  }
}

let cachedZinePictures: PictureWithRelationsAndUrl[] | null = null;

/**
 * Fetches zine pictures with caching.
 * @returns A list of cached zine pictures.
 */
export async function fetchZinePictures(): Promise<
  PictureWithRelationsAndUrl[]
> {
  if (!cachedZinePictures) {
    cachedZinePictures = await getZinePictures();
  }
  return cachedZinePictures;
}
