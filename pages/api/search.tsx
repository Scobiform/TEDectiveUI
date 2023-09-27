
import { NextApiRequest, NextApiResponse } from 'next';

// Create an object to cache responses
const cache: any = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

     // API URL
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    // Get the query parameter from the request
    const { q } = req.query as { q: string };

    if (!q) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    // Check if the response is already cached
    if (cache[q]) {
        //console.log('Using cached response for', q);
        return res.status(200).json(cache[q]);
    }

    // Make a request to your FastAPI backend to perform the search
    fetch(apiURL+'entities/organization/search/'+q).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        //console.log('Fetched data for', q);
        // Cache the response
        cache[q] = data;
        // Respond with the fetched data
        res.status(200).json(data);
        })
        .catch((error) => {
        //console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
