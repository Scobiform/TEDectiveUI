import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises'; // Import the promises-based file system module
import path from 'path'; // Import the path module

// Define the directory for cached data
const cacheDirectory = path.join(process.cwd(), './public/cache');

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

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  // Ensure that the cache directory exists
  await ensureCacheDirectoryExists();

  // Check if the response is already cached
  const cacheFilePath = path.join(cacheDirectory, `${q}.json`);
  try {
    const cachedData = await fs.readFile(cacheFilePath, 'utf8');
    const parsedCachedData = JSON.parse(cachedData);
    return res.status(200).json(parsedCachedData);
  } catch (cacheReadError) {
    // If cached data is not available or there's an error reading it, fetch and cache new data.
  }

  // Make a fetch request to an external API using the query parameter
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
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
