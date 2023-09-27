import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises'; // Import the promises-based file system module
import path from 'path'; // Import the path module

// Define the cache directory path
const cacheDirectory = path.join(process.cwd(), 'public', 'cache', 'search');

// Create an object to cache responses
const cache: { [key: string]: any } = {};

// Function to ensure the cache directory exists
async function ensureCacheDirectoryExists() {
  try {
    await fs.mkdir(cacheDirectory, { recursive: true });
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // API URL
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // Get the query parameter from the request
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

  // Make a request to your FastAPI backend to perform the search
  try {
    const response = await fetch(apiURL + 'entities/organization/search/' + q);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();

    // Cache the response by writing it to a file
    await fs.writeFile(cacheFilePath, JSON.stringify(data), 'utf8');

    // Respond with the fetched data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
