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
      const response = await fetch('mockSearch.json');
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
        <div className={styles.Search}>
            <input
              type="text"
              placeholder="Search for an organization..."
              onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 && (
          <ul className={styles.SearchResults}>
            {searchResults.map((result) => (
              <li key={result.id}>
                {/* TODO: On organization click request organization graph */}
                <a href="#" >
                  {result.name}
                </a>
                </li>
            ))}
          </ul>
        )}
      </>
    );
  };

export default Search;