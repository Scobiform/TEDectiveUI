import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises'; // Import the promises-based file system module
import path from 'path'; // Import the path module

const cacheDirectories = [
  './public/cache/geocode', // Change this to the path of your geocode cache
  './public/cache/search',  // Change this to the path of your search cache
  './public/cache/graph',   // Change this to the path of your graph cache
];

interface CachedData {
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
        cachedData.push(parsedData);
      }
    } catch (error) {
      console.error('Error reading cached files:', error);
    }
  }

  res.status(200).json(cachedData);
}
