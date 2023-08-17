'use client'
import { useEffect, useState } from "react";
import styles from './search.module.css'

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isFetching, setIsFetching] = useState(false);
  
    useEffect(() => {
      if (query) {
        setIsFetching(true);
  
        // Simulate fetching from the API after a short delay
        const delay = setTimeout(() => {
          onSearch(query);
          setIsFetching(false);
        }, 300); // Delay for 300 milliseconds
  
        // Cleanup the timeout on unmount or when query changes
        return () => clearTimeout(delay);
      }
    }, [query, onSearch]);
  
    const handleSearch = () => {
      onSearch(query);
    };
  
    return (
      <div className={styles.Search}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an organization..."
        />
        <button onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20" viewBox="0 0 20 20"><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"></path></svg></button>
        {isFetching && <p>Fetching...</p>}
      </div>
    );
  };

export default Search;