import { NextApiRequest, NextApiResponse } from 'next';

// Create an object to cache responses
const cache: any = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Get the query parameter from the request
  const { q } = req.query as { q: string };

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  // Check if the response is already cached
  if (cache[q]) {
    console.log('Using cached response for', q);
    return res.status(200).json(cache[q]);
  }

  // Make a fetch request to an external API using the query parameter
  fetch(`https://geocode.maps.co/search?q=${q}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched data for', q);
      // Cache the response
      cache[q] = data;
      // Respond with the fetched data
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

export default handler;