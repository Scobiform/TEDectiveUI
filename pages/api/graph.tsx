import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// Define the directory for cached data
const cacheDirectory = path.join(process.cwd(), './public/cache/graph');

// Function to ensure the cache directory exists
async function ensureCacheDirectoryExists() {
  try {
    await fs.mkdir(cacheDirectory, { recursive: true });
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query as { q: string };
  //console.log(q);

  if (!q || q === 'undefined' || q === '' || q === null) {
    return;
  }

  // Ensure that the cache directory exists
  await ensureCacheDirectoryExists();

  // Check if the response is already cached
  const cacheFilePath = path.join(cacheDirectory, `${q}.json`);

  try {
    const cachedData = await fs.readFile(cacheFilePath, 'utf8');
    const parsedCachedData = JSON.parse(cachedData);
    // If the file is older than 7 days, continue with the fetch request
    const fileStat = await fs.stat(cacheFilePath);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    //console.log(fileStat.mtime, sevenDaysAgo);

    if (fileStat.mtime < sevenDaysAgo) {
      // If the file is older than seven days, fetch and cache new data.
      throw new Error('Cache is outdated');
    }

    // If the cache file exists, return the cached data
    if(parsedCachedData) {
      return res.status(200).json(parsedCachedData);
    }
    else {
      throw new Error('Cache is empty');
    }
  } catch (cacheReadError) {
    // If the cache file does not exist, continue with the fetch request
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const buyerGraphPath = apiURL + 'graph/releases/buyer/';
    const supplierGraphPath = apiURL + 'graph/releases/supplier/';

    try {
      const [buyerResponse, supplierResponse] = await Promise.all([
        fetch(buyerGraphPath + q),
        fetch(supplierGraphPath + q),
      ]);

      if (!buyerResponse.ok || !supplierResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [buyerData, supplierData] = await Promise.all([
        buyerResponse.json(),
        supplierResponse.json(),
      ]);

      // Cache the response by writing it to a file
      await fs.writeFile(cacheFilePath, JSON.stringify({ buyerData, supplierData }), 'utf8');

      res.status(200).json({ buyerData, supplierData });
    } catch (error) {
      //console.error('Error fetching data:', error);
      //res.status(500).json({ error: 'Internal server error' });
    }
  }
}

