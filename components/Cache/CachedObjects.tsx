import React, { useState, useEffect } from 'react';
import styles from './cache.module.css';

interface CachedObject {
  name: ReactNode;
  type: string; // Add 'type' field to CachedObject
  place_id: undefined;
  buyerData: undefined;
  data: any;
}

function CachedObjects() {
  const [cachedData, setCachedData] = useState<CachedObject[]>([]);
  const [searchCache, setSearchCache] = useState<CachedObject[]>([]);
  const [graphCache, setGraphCache] = useState<CachedObject[]>([]);
  const [geocodeCache, setGeocodeCache] = useState<CachedObject[]>([]);

  useEffect(() => {
    async function fetchCachedData() {
      try {
        const response = await fetch('/api/cachedObjects'); // Make a request to the API route
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data: CachedObject[] = await response.json();

        // Sort cached data into separate lists based on their type
        const searchList: CachedObject[] = [];
        const graphList: CachedObject[] = [];
        const geocodeList: CachedObject[] = [];

        data.forEach((item: CachedObject) => {
          switch (item.type) {
            case 'search':
              searchList.push(item);
              break;
            case 'graph':
              graphList.push(item);
              break;
            case 'geocode':
              geocodeList.push(item);
              break;
            default:
              // Handle unexpected types if necessary
              console.warn(`Unexpected type in cached object: ${item.type}`);
              break;
          }
        });

        setSearchCache(searchList);
        setGraphCache(graphList);
        setGeocodeCache(geocodeList);
        setCachedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Fetch cached data when the component mounts
    fetchCachedData();
  }, []);

  return (
    <div className={styles.cachedObjects}>
      <h2>Cached Objects</h2>
      <h3>Search Cache</h3>
      <ul>
        {searchCache.map((data, index) => (
          <li key={index}>
            <p>{JSON.stringify(data, null, 2)}</p>
          </li>
        ))}
      </ul>
      <h3>Graph Cache</h3>
      <ul>
        {graphCache.map((data, index) => (
          <li key={index}>
            <p>{JSON.stringify(data, null, 2)}</p>
          </li>
        ))}
      </ul>

      <h3>Geocode Cache</h3>
      <ul>
        {geocodeCache.map((data, index) => (
          <li key={index}>
            <p>{JSON.stringify(data, null, 2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CachedObjects;
