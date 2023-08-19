import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from './search.module.css'

interface SearchResult {
  orgId: string;
  name: string;
  apiPath: string;
}

interface SearchProps {
  apiPath: string;
  setApiPath: any;
}

const Search = ({apiPath, setApiPath}: SearchProps) => {

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    // Prevent fetching if the query is empty
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch('mockSearch.json'); // search?q=${query}
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (result: SearchResult) => {
    setApiPath(result.apiPath);
  };

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for an organization..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 && (
        <>
          <ul className={styles.searchResults}>
            {searchResults.map((result: SearchResult, index) => (
              <li key={index}>
                {/* Use next/link to navigate to dynamic route 
                or prop GraphWrapper on home with id */}
                <button onClick={() => handleClick(result)}>
                  {result.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Search;
