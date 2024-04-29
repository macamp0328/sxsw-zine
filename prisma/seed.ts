// run using: npx prisma db seed
import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';
import stream, { Writable } from 'stream';
import util from 'util';

const pipeline = util.promisify(stream.pipeline);
const prisma = new PrismaClient();

async function readCsvData<
  T extends
    | Prisma.BandCreateInput
    | Prisma.VenueCreateInput
    | Prisma.PictureUncheckedCreateInput
    | Prisma.LinkUncheckedCreateInput,
>(filePath: string, transform: (data: any) => T): Promise<T[]> {
  const results: T[] = [];
  await pipeline(
    fs.createReadStream(filePath),
    csv(),
    new Writable({
      objectMode: true,
      write(
        chunk: any,
        encoding: string,
        callback: (error?: Error | null) => void,
      ): void {
        try {
          const transformed = transform(chunk);
          results.push(transformed);
          callback();
        } catch (err) {
          console.error(`Error transforming data: ${err}`);
          callback(
            err instanceof Error
              ? err
              : new Error(`Error processing data: ${err}`),
          );
        }
      },
    }),
  );
  return results;
}

async function main(): Promise<void> {
  try {
    console.log('Starting to delete existing data...');
    await prisma.link.deleteMany({});
    await prisma.picture.deleteMany({});
    await prisma.venue.deleteMany({});
    await prisma.band.deleteMany({});
    console.log('Existing data deleted.');

    const bandsData = await readCsvData<Prisma.BandCreateInput>(
      './prisma/seed-data/Band-seed.csv',
      (data) => ({
        name: data.name,
        slug: data.slug,
        origin: data.origin,
        bio: data.bio,
        milesThoughts: data.milesThoughts,
        genre: data.genre,
        instagramHandle: data.instagramHandle,
      }),
    );

    const venuesData = await readCsvData<Prisma.VenueCreateInput>(
      './prisma/seed-data/Venue-seed.csv',
      (data) => ({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
      }),
    );

    const bandMap = new Map();
    const venueMap = new Map();
    for (const band of bandsData) {
      const createdBand = await prisma.band.create({ data: band });
      bandMap.set(band.name, createdBand.id);
    }
    for (const venue of venuesData) {
      const createdVenue = await prisma.venue.create({ data: venue });
      venueMap.set(venue.name, createdVenue.id);
    }

    // Insert pictures
    const picturesData = await readCsvData<Prisma.PictureUncheckedCreateInput>(
      './prisma/seed-data/Picture-seed.csv',
      (data) => ({
        filename: data.filename,
        height: parseInt(data.height, 10),
        width: parseInt(data.width, 10),
        takenAt: new Date(data.takenAt),
        isZine: data.isZine.toLowerCase() === 'true',
        bandId: bandMap.get(data.bandId),
        venueId: venueMap.get(data.venueId),
      }),
    );

    for (const picture of picturesData) {
      await prisma.picture.create({ data: picture });
    }

    // Insert links
    const linksData = await readCsvData<Prisma.LinkUncheckedCreateInput>(
      './prisma/seed-data/Link-seed.csv',
      (data) => ({
        url: data.url,
        platform: data.platform, // as Prisma.Platform,
        linkType: data.linkType, // as Prisma.LinkType,
        bandId: bandMap.get(data.bandId),
        venueId: venueMap.get(data.venueId),
      }),
    );

    for (const link of linksData) {
      await prisma.link.create({ data: link });
    }

    console.log(
      'Successfully completed the insertion of all bands, venues, pictures, and links.',
    );
  } catch (e) {
    console.error('Failed to seed database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected from database.');
  }
}

main();
