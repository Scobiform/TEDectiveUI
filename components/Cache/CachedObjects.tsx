import React, { useState, useEffect } from 'react';
import styles from './cache.module.css';

interface CachedObject {
  filename: string;
  type: string;
}

function Accordion({ title, content, isOpen, toggleAccordion }: any) {
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionTitle} onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span className={isOpen ? styles.arrowOpen : styles.arrowClose}></span>
      </div>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
}

function CachedObjects() {
  const [cachedData, setCachedData] = useState<CachedObject[]>([]);
  const [searchCache, setSearchCache] = useState<CachedObject[]>([]);
  const [graphCache, setGraphCache] = useState<CachedObject[]>([]);
  const [geocodeCache, setGeocodeCache] = useState<CachedObject[]>([]);
  const [openSection, setOpenSection] = useState<string[]>(['search', 'graph', 'geocode']);

  useEffect(() => {
    async function fetchCachedData() {
      try {
        const response = await fetch('/api/cache'); // Make a request to the API route
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

  const toggleAccordion = (sectionName: string) => {
    if (openSection.includes(sectionName)) {
      setOpenSection(openSection.filter((name) => name !== sectionName));
    } else {
      setOpenSection([...openSection, sectionName]);
    }
  };

  return (
    <div className={styles.cachedObjects}>
      <Accordion
        title="Graph Cache"
        content={
          <ul>
            {graphCache.map((data, index) => (
              <li key={index}>
                <p>{data.filename.replace('.json', '')}</p>
              </li>
            ))}
          </ul>
        }
        isOpen={openSection.includes('graph')}
        toggleAccordion={() => toggleAccordion('graph')}
      />
      <Accordion
        title="Geocode Cache"
        content={
          <ul>
            {geocodeCache.map((data, index) => (
              <li key={index}>
                <p>{data.filename.replace('.json', '')}</p>
              </li>
            ))}
          </ul>
        }
        isOpen={openSection.includes('geocode')}
        toggleAccordion={() => toggleAccordion('geocode')}
      />
    </div>
  );
}

export default CachedObjects;