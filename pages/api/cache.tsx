import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const cacheDirectories: { [key: string]: string } = {
  geocode: './public/cache/geocode',
  search: './public/cache/search',
  graph: './public/cache/graph',
};

type CachedDataType = {
  type: keyof typeof cacheDirectories; // Use the keys of cacheDirectories as types
  filename: string; // Add a filename property
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedFiles: CachedDataType[] = [];

  for (const type of Object.keys(cacheDirectories)) {
    const cacheDirectory = cacheDirectories[type];

    try {
      const files = await fs.readdir(cacheDirectory);

      for (const file of files) {
        const filePath = path.join(cacheDirectory, file);
        const filename = path.basename(file); // Get the filename

        // Add the 'type' and 'filename' fields to each cached file object
        cachedFiles.push({ type, filename });
      }
    } catch (error) {
      console.error('Error reading cached files:', error);
    }
  }

  res.status(200).json(cachedFiles);
}
