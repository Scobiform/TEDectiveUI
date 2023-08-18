'use client'
import { useEffect, useState } from "react";
import styles from './search.module.css'

interface SearchResult {
  id: string;
  name: string;
}

const Search: React.FC = () => {
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
  
    return (
      <>
        <div className={styles.search}>
            <input
              type="text"
              placeholder="Search for an organization..."
              onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
        {/*Could be nice to have horizontal scroll for organization cards here - flex-direction*/}
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 && (
          <>
            <ul className={styles.searchResults}>
              {searchResults.map((result) => (
                <li key={result.id}>
                  {/* TODO: On organization click request organization graph or use dynamic route*/}
                  <a href="#" >
                    {result.name}
                  </a>
                </li>
              ))}
            </ul>
          {/*
          <div className={styles.advancedSearch}>
            <button>Advanced search</button>
          </div>
          */}
          </>
        )}
      </>
    );
  };

export default Search;