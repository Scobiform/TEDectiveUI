import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const cacheDirectories = [
  './public/cache/geocode',
  './public/cache/search',
  './public/cache/graph',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedFileNames: string[] = [];

  for (const cacheDirectory of cacheDirectories) {
    try {
      const files = await fs.readdir(cacheDirectory);

      for (const file of files) {
        // Add the filename to the list
        cachedFileNames.push(file);
      }
    } catch (error) {
      console.error('Error reading cached files:', error);
    }
  }

  res.status(200).json(cachedFileNames);
}
