const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define data for bands and venues
const bandsData = [
  {
    name: 'Willow Parlo',
    slug: 'willow-parlo',
    origin: 'Austin, Texas',
    bio: 'A psychedelic rock band known for their electric performances.',
    genre: 'Psychedelic Rock',
  },
  {
    name: 'Jazz & Java',
    slug: 'jazz-java',
    origin: 'New York, New York',
    bio: 'Smooth jazz band with a hint of coffee aroma in their music.',
    genre: 'Jazz',
  },
];

const venuesData = [
  {
    name: 'Downtown Club',
    address: '123 Main St',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
  },
  {
    name: 'Jazz Hub',
    address: '456 Side St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
];

// Function to create bands
async function createBands(
  bands: {
    name: string;
    slug: string;
    origin: string;
    bio: string;
    genre: string;
  }[],
) {
  return prisma.band.createMany({
    data: bands,
  });
}

// Function to create venues
async function createVenues(
  venues: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }[],
) {
  return prisma.venue.createMany({
    data: venues,
  });
}

// Function to create pictures with mapped IDs
async function createPictures(
  bandIds: { [x: string]: any },
  venueIds: { [x: string]: any },
) {
  const picturesData = [
    {
      filename: 'band_at_downtown.jpg',
      height: 800,
      width: 1200,
      filePath: '/photos/test-1.jpg',
      takenAt: new Date('2024-04-01T12:00:00Z'),
      isIndoor: true,
      isZine: false,
      bandId: bandIds['Willow Parlo'],
      venueId: venueIds['Downtown Club'],
    },
    {
      filename: 'jazz_night.jpg',
      height: 600,
      width: 900,
      filePath: '/photos/test-2.jpg',
      takenAt: new Date('2024-04-02T15:00:00Z'),
      isIndoor: true,
      isZine: true,
      bandId: bandIds['Jazz & Java'],
      venueId: venueIds['Jazz Hub'],
    },
  ];

  return prisma.picture.createMany({
    data: picturesData,
  });
}

// Main seeding function
async function main() {
  // Delete all existing data
  await prisma.link.deleteMany({});
  await prisma.picture.deleteMany({});
  await prisma.venue.deleteMany({});
  await prisma.band.deleteMany({});

  // Create bands and venues
  await createBands(bandsData);
  await createVenues(venuesData);

  // Fetch IDs for bands and venues
  const createdBands = await prisma.band.findMany({
    select: { id: true, name: true },
  });
  const createdVenues = await prisma.venue.findMany({
    select: { id: true, name: true },
  });

  // Map names to IDs
  const bandIds = createdBands.reduce(
    (acc: { [x: string]: any }, band: { name: string | number; id: any }) => {
      acc[band.name] = band.id;
      return acc;
    },
    {},
  );
  const venueIds = createdVenues.reduce(
    (acc: { [x: string]: any }, venue: { name: string | number; id: any }) => {
      acc[venue.name] = venue.id;
      return acc;
    },
    {},
  );

  // Create pictures
  await createPictures(bandIds, venueIds);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
