// Contains all the actions that can be called from components that interact with database, api, or other services.

import {
  type Band,
  type Picture,
  PrismaClient,
  type Venue,
} from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const data = require('./temp-data.json');

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

// Define a type that reflects the structure including relationships
type PictureWithRelations = Picture & {
  band: Band | null; // Assuming Band can be null
  venue: Venue | null; // Assuming Venue can be null
};

// get pictures
export function getPictures() {
  return data.pictures;
}

// gets all zine pictures, which would be featured on main page
// - this translates to one picture per band
export async function getZinePictures(): Promise<PictureWithRelations[]> {
  noStore();
  try {
    const pictures = await prisma.picture.findMany({
      // where: { isZine: true },
      include: { band: true, venue: true },
    });
    return pictures;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// gets picture, band, and venue details based on band slug
export async function getPictureDetails(bandSlug: string): Promise<any> {
  noStore();
  try {
    const picture = await prisma.picture.findFirst({
      where: { band: { slug: bandSlug } },
      include: { band: true, venue: true },
    });
    return picture;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// get bands

// get venues

// get pictures of a band

// export default function getNextBand(pictureId: string){

// }
