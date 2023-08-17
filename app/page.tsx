'use client'
import styles from './page.module.css'
import Header from './components/Static/Header';
import GraphWrapper from './components/Graph/GraphWrapper';
import Search from './components/Search/Search';
import LoadingSpinner from './components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';

interface SearchResult {
  id: string;
  name: string;
}

const Home: React.FC = () => {

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Releases per Buyer Graph
  //let apiUrl = '/latest/graphql/releases_per_buyer/1623e936-cdd6-522e-a5ed-54bce68301f2';
  // Awards per Organization Graph
  //let apiUrl = '/latest/graphql/award_per_org/f7fef1d1-8088-59d0-baf1-2afa825458ad';
  let apiUrl = 'initial.json';

  // TODO: - Make own component for fetching data 
  //       - fetch graph data based on search and dynamic routes
  //       - fetch graph data based on view perspective

  // Fetch json from API
  const [graphData, setGraphData] = useState({nodes: [], links: []});
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setGraphData(data);
        setIsLoading(false);
      }
    );
  }, []);

  // Search state
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    // Make an API request to fetch data based on the query
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* The GraphWrapper takes GraphData 
        @ts-ignore                           */}
        <GraphWrapper graphData={graphData} />
        {/* Loading spinner CSS in globals*/}
        {isLoading ? <LoadingSpinner /> : 
          <p>TEDective makes European public procurement data explorable for non-experts</p>}
        {/* Mock up search for now */}
        <Search onSearch={handleSearch} />
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Home;
