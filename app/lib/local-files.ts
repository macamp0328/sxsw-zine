import fs from 'fs/promises';
import path from 'path';

type LocalFile = {
  name: string;
  url: string;
};

export class MissingLocalFileError extends Error {
  constructor(filename: string) {
    super(`Missing local file mapping for ${filename}`);
    this.name = 'MissingLocalFileError';
  }
}

const localPhotoUrls = [
  '/photos/opengraph-meta.jpg',
  '/photos/header-miles.jpg',
  '/photos/drumming.jpg',
  '/photos/nickel.jpg',
];

export async function listFiles(): Promise<LocalFile[]> {
  const seedPath = path.join(
    process.cwd(),
    'prisma/seed-data/Picture-seed.csv',
  );

  try {
    const csv = await fs.readFile(seedPath, 'utf8');
    const filenames = csv
      .split(/\r?\n/)
      .slice(1)
      .map((line) => line.split(',')[0]?.trim())
      .filter(Boolean);

    return filenames.map((name, index) => ({
      name,
      url: localPhotoUrls[index % localPhotoUrls.length],
    }));
  } catch {
    return localPhotoUrls.map((url) => ({
      name: path.basename(url),
      url,
    }));
  }
}

export async function readLocalFile(filename: string): Promise<Buffer> {
  const files = await listFiles();
  const file = files.find((candidate) => candidate.name === filename);
  if (!file) {
    throw new MissingLocalFileError(filename);
  }

  return fs.readFile(path.join(process.cwd(), 'public', file.url));
}
