import { NextApiRequest, NextApiResponse } from 'next';

// Create an object to cache responses
const cache: any = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Get the query parameter from the request
  const { q } = req.query;

  if (!q || !Array.isArray(q)) {
    return res.status(400).json({ error: 'Missing or invalid query parameter' });
  }

  // Extract the first element of the array (assuming it's a single string query)
  const query = q[0];

  // Check if the response is already cached
  if (cache[query]) {
    console.log('Using cached response for', query);
    return res.status(200).json(cache[query]);
  }

  // Make a fetch request to an external API using the query parameter
  fetch(`https://geocode.maps.co/search?q=${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched data for', query);
      // Cache the response
      cache[query] = data;
      // Respond with the fetched data
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

export default handler;