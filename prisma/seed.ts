const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addBandsAndRelatedData() {
  const bandsData = [
    {
      name: 'The Cosmic Riders',
      slug: 'the-cosmic-riders',
      origin: 'Austin, Texas',
      bio: 'A psychedelic rock band known for their electric performances.',
      genre: 'Psychedelic Rock',
      pictures: {
        create: [
          {
            filename: 'test-1.jpg',
            height: 800,
            width: 1200,
            filePath: '/photos/test-1.jpg',
            takenAt: new Date('2024-04-01T12:00:00Z'),
            isIndoor: true,
            isZine: true,
          },
        ],
      },
      links: {
        create: [
          {
            url: 'https://instagram.com/the_cosmic_riders',
            platform: 'Instagram',
            linkType: 'Profile',
          },
          {
            url: 'https://youtube.com/the_cosmic_riders_live',
            platform: 'YouTube',
            linkType: 'Video',
          },
        ],
      },
    },
    {
      name: 'Jazz & Java',
      slug: 'jazz-java',
      origin: 'New York, New York',
      bio: 'Smooth jazz band with a hint of coffee aroma in their music.',
      genre: 'Jazz',
      pictures: {
        create: [
          {
            filename: 'test-2.jpg',
            height: 600,
            width: 900,
            filePath: '/photos/test-2.jpg',
            takenAt: new Date('2024-04-02T15:00:00Z'),
            isIndoor: true,
            isZine: true,
          },
        ],
      },
      links: {
        create: [
          {
            url: 'https://spotify.com/jazz_java',
            platform: 'Spotify',
            linkType: 'Profile',
          },
        ],
      },
    },
  ];

  await Promise.all(
    bandsData.map((band) => prisma.band.create({ data: band })),
  );
}

async function addVenuesAndRelatedData() {
  const venuesData = [
    {
      name: 'Downtown Club',
      address: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      pictures: {
        create: [
          {
            filename: 'venue_downtown.jpg',
            height: 650,
            width: 1000,
            filePath: '/images/venue_downtown.jpg',
            takenAt: new Date('2024-04-03T20:00:00Z'),
            isIndoor: true,
          },
        ],
      },
      links: {
        create: [
          {
            url: 'https://facebook.com/downtownclub',
            platform: 'Facebook',
            linkType: 'Profile',
          },
        ],
      },
    },
  ];

  await Promise.all(
    venuesData.map((venue) => prisma.venue.create({ data: venue })),
  );
}

async function main() {
  // Delete all existing data
  await prisma.link.deleteMany({});
  await prisma.picture.deleteMany({});
  await prisma.venue.deleteMany({});
  await prisma.band.deleteMany({});

  // Add new data
  await addBandsAndRelatedData();
  await addVenuesAndRelatedData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
