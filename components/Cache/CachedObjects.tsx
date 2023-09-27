import React, { useState, useEffect } from 'react';
import styles from './cache.module.css';

function CachedObjects() {
  const [cachedData, setCachedData] = useState([]);

  useEffect(() => {
    async function fetchCachedData() {
      try {
        const response = await fetch('/api/cachedObjects'); // Make a request to the API route
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
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
      <ul>
        {cachedData.map((data, index) => (
          <li key={index}>
            <p>{JSON.stringify(data, null, 2)}</p>

            (/* Show display)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CachedObjects;
