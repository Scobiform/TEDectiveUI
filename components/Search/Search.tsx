import { useEffect, useRef, useState } from "react";
import styles from './search.module.css';

interface SearchResult {
  id: string;
  name: string;
  apiPath: string;
}

interface SearchProps {
  apiPath: string;
  setApiPath: any;
}

const Search = ({ apiPath, setApiPath }: SearchProps) => {
  // Search results state
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);

  // API URL
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // Ref to store the search timeout
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Modify the input change handler to debounce the search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // Cancel the previous search request if it exists
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set a new timeout for the search
    searchTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 200); // Adjust the delay time (in milliseconds) as needed
  };

  // Fetch search results
  const handleSearch = async (query: string) => {
    // Prevent fetching if the query is empty or less than 3 characters
    if (query.trim() === '' || query.length < 3) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      const response = await fetch(apiURL + 'entities/organization/search/' + query);
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
          onChange={handleInputChange}
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
