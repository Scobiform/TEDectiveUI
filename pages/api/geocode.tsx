import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises'; // Import the promises-based file system module
import path from 'path'; // Import the path module

// Define the cache directory path
const cacheDirectory = path.join(process.cwd(), 'public', 'cache', 'geocode');

// Function to ensure the cache directory exists
async function ensureCacheDirectoryExists() {
  try {
    await fs.mkdir(cacheDirectory, { recursive: true });
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
}

// Define the handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the query parameter from the request
  const { q } = req.query as { q: string };

  if (!q || q === 'undefined' || q === '' || q === null) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  // Ensure that the cache directory exists
  await ensureCacheDirectoryExists();

  // Check if the response is already cached
  const cacheFilePath = path.join(cacheDirectory, `${q}.json`);
  try {
    const cachedData = await fs.readFile(cacheFilePath, 'utf8');
    const parsedCachedData = JSON.parse(cachedData);

    // If file is existing return the cached data with 200 status code
    if(parsedCachedData) {
      return res.status(200).json(parsedCachedData);
    }
    else {
      throw new Error('Cache is empty');
    }

  } catch (cacheReadError) {
    // If the cache file does not exist, continue with the fetch request
    try {
      // Getting geocode data from geocode.maps.co API
      const response = await fetch(`https://geocode.maps.co/search?q=${q}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();

      // Cache the response by writing it to a file
      await fs.writeFile(cacheFilePath, JSON.stringify(data), 'utf8');

      // Respond with the fetched data
      res.status(200).json(data);
    } catch (error) {
      //console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } 
};

export default handler;
