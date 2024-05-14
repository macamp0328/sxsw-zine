/**
 * run from root using: node .\prisma\scripts\generate-pictures-seed.js
 */

/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const sharp = require('sharp');
const exifReader = require('exif-reader');
const { createObjectCsvWriter } = require('csv-writer');

// CSV writer setup
const csvWriter = createObjectCsvWriter({
  path: './prisma/scripts/raw-picture-seed.csv',
  header: [
    { id: 'id', title: 'ID' }, // ID will be left empty
    { id: 'filename', title: 'FILENAME' },
    { id: 'height', title: 'HEIGHT' },
    { id: 'width', title: 'WIDTH' },
    { id: 'takenAt', title: 'TAKENAT' },
    { id: 'isZine', title: 'ISZINE' },
    { id: 'fStop', title: 'FSTOP' },
    { id: 'exposureTime', title: 'EXPOSURETIME' },
    { id: 'ISO', title: 'ISO' },
    { id: 'bandId', title: 'BANDID' }, // Assuming these will be populated later
    { id: 'venueId', title: 'VENUEID' }, // Assuming these will be populated later
  ],
});

// Directory containing images
const dir = './prisma/scripts/images';

// Function to process images
async function processImages() {
  const records = [];

  // Read files from directory
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.jpg'));

  for (const file of files) {
    const imagePath = `${dir}/${file}`;

    try {
      // Get image metadata using sharp
      const metadata = await sharp(imagePath).metadata();
      const { width, height, exif } = metadata;

      // Initialize 'takenAt' variable and additional EXIF fields
      let takenAt = '';
      let fStop = '';
      let exposureTime = '';
      let ISO = '';

      // Check if EXIF data exists and process it
      if (exif) {
        try {
          const exifData = exifReader(exif);
          console.log('EXIF Data:', exifData); // Debug: log entire EXIF data
          takenAt = exifData?.Photo?.DateTimeOriginal || '';
          fStop = exifData?.Photo?.FNumber || '';
          exposureTime = exifData?.Photo?.ExposureTime || '';
          ISO = exifData?.Photo?.ISOSpeedRatings || '';
          console.log(`ISO Speed Ratings for ${file}:`, ISO);
        } catch (exifError) {
          console.error(`Error reading EXIF for ${file}:`, exifError);
        }
      }

      // Add to records, setting 'isZine' to true by default
      records.push({
        id: '', // ID left blank
        filename: file,
        height,
        width,
        takenAt,
        isZine: true,
        fStop,
        exposureTime,
        ISO,
        bandId: '', // Left blank, assuming to be populated later
        venueId: '', // Left blank, assuming to be populated later
      });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  // Write to CSV
  await csvWriter
    .writeRecords(records)
    .then(() => console.log('CSV file has been written.'))
    .catch((err) => console.error('Error writing CSV:', err));
}

// Run the process
processImages();
