import { NextApiRequest, NextApiResponse } from 'next';

// Create an object to cache responses
const cache: { [key: string]: any } = {};

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  // Get the query parameter from the request
  const { q } = req.query as { q: string };

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  // Check if the response is already cached
  if (cache[q]) {
    return res.status(200).json(cache[q]);
  }

  // API URL
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // Graph paths
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

    // Cache the response
    cache[q] = { buyerData, supplierData };

    // Respond with the fetched data
    res.status(200).json({ buyerData, supplierData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
