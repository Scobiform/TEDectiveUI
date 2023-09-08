import { useEffect, useRef, useState } from "react";
import styles from './search.module.css'

interface SearchResult {
  id: string;
  name: string;
  apiPath: string;
}

interface SearchProps {
  apiPath: string;
  setApiPath: any;
}

const Search = ({apiPath, setApiPath}: SearchProps) => {

  // Search results state
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);

  // Fetch search results
  const handleSearch = async (query: string) => {
    // Prevent fetching if the query is empty
    if (query.trim() === '' || query.length < 3) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    
    // Set loading state
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 280));
      const response = await fetch('https://api.tedective.org/latest/entities/organization/search/' + query); // ${query}
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set the API path when a search result is clicked
  const handleClick = (result: SearchResult) => {
    setApiPath(result.id);
    setSearchResults([]);
  };

  return (
    <>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="Search for an organization..."
          onChange={(e) => handleSearch(e.target.value)}
          autoFocus
          aria-label="Search for an organization (S)"
          tabIndex={0}
          accessKey="S"
        />
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 && (
          <>
            <ul id={styles.SearchResults}>
              {searchResults.map((result: SearchResult, index) => (
                <li key={index}>
                  <button onClick={() => handleClick(result)} tabIndex={0} aria-label={result.name}>
                    {result.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
