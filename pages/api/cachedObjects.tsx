import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const cacheDirectories: string[] = [
  './public/cache/geocode',
  './public/cache/search',
  './public/cache/graph',
];

interface CachedData {
  type: string;
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedData: CachedData[] = [];

  for (const cacheDirectory of cacheDirectories) {
    try {
      const files = await fs.readdir(cacheDirectory);

      for (const file of files) {
        const filePath = path.join(cacheDirectory, file);
        const cachedContent = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(cachedContent);

        // Add the 'type' field to each cached object based on the cacheDirectory
        const type = cacheDirectory.split('/').pop(); // Get the last segment as 'type'
        cachedData.push({ type, ...parsedData });
      }
    } catch (error) {
      console.error('Error reading cached files:', error);
    }
  }

  res.status(200).json(cachedData);
}
