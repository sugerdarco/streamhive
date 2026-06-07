import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const timerRef = useRef(null);

  const debounceSearch = useCallback((value) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 400);
  }, [onSearch]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debounceSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timerRef.current);
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={18} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search videos..."
        value={query}
        onChange={handleChange}
        id="search-input"
      />
      {query && (
        <button type="button" className="search-bar-clear" onClick={handleClear} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
      <button type="submit" className="search-bar-submit" aria-label="Search">
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
