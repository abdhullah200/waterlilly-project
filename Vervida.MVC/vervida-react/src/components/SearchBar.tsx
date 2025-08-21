import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="search-input"
        placeholder="Search products, categories, or descriptions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          paddingLeft: '3rem',
          paddingRight: searchTerm ? '3rem' : '1.5rem'
        }}
      />
      
      {/* Search Icon */}
      <div className="position-absolute top-50 translate-middle-y" style={{ left: '1rem' }}>
        <i className="bi bi-search search-icon"></i>
      </div>
      
      {/* Clear Button */}
      {searchTerm && (
        <button
          className="btn p-0 position-absolute top-50 translate-middle-y"
          style={{ 
            right: '1rem',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(102, 126, 234, 0.1)',
            border: 'none',
            color: 'rgba(102, 126, 234, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setSearchTerm('')}
          title="Clear search"
        >
          <i className="bi bi-x" style={{ fontSize: '0.9rem' }}></i>
        </button>
      )}
      
      {/* Search suggestions count (if you want to add this later) */}
      {searchTerm && (
        <div className="position-absolute w-100 mt-1" style={{ zIndex: 10 }}>
          <small className="text-muted ps-3">
            <i className="bi bi-search me-1"></i>
            Searching for "{searchTerm}"
          </small>
        </div>
      )}
    </div>
  );
};

export default SearchBar;