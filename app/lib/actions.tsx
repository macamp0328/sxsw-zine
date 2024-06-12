// lib/actions.ts

import {
  type Band,
  type Link,
  type Picture,
  PrismaClient,
  type Venue,
} from '@prisma/client';

import { listFiles as listBlobFiles } from './blobs';
import { listFiles as listS3Files } from './s3';

const prisma = new PrismaClient();

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Define the type for NonZinePicture
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
  notZinePictures?: NonZinePicture[]; // Add this field to PictureWithRelationsAndUrl
};

const listFiles = async () => {
  if (process.env.STORAGE_TYPE === 's3') {
    return listS3Files();
  }
  return listBlobFiles();
};

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
  } catch (e) {
    console.error(e);
    throw e;
  }
}

let cachedZinePictures: PictureWithRelationsAndUrl[] | null = null;

export async function fetchZinePictures(): Promise<
  PictureWithRelationsAndUrl[]
> {
  if (!cachedZinePictures) {
    cachedZinePictures = await getZinePictures();
  }
  return cachedZinePictures;
}
