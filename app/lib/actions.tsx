// Contains all the actions that can be called from components that interact with database, api, or other services.

import { type Picture, PrismaClient } from '@prisma/client';

const data = require('./temp-data.json');

const prisma = new PrismaClient();

// get pictures
export function getPictures() {
  console.log(data);
  return data.pictures;
}

// gets all zine pictures, which would be featured on main page
// - this translates to one picture per band
export default async function getZinePictures(): Promise<Picture[]> {
  try {
    const pictures = await prisma.picture.findMany({
      // where: { isZine: true },
      include: { band: true },
    });
    console.log('pictures', pictures);
    console.log('pictures', typeof pictures);
    return pictures;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// get bands

// get venues

// get pictures of a band
