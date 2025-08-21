import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="position-relative" style={{ minWidth: '220px' }}>
      {/* Category Icon */}
      <div className="position-absolute top-50 translate-middle-y" style={{ left: '1rem', zIndex: 2 }}>
        <i className="bi bi-tags" style={{ color: 'rgba(102, 126, 234, 0.7)', fontSize: '1.2rem' }}></i>
      </div>
      <button 
        className="dropdown-toggle w-100 d-flex justify-content-between align-items-center"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
          border: '1px solid #a18cd1',
          borderRadius: '2rem',
          boxShadow: '0 2px 8px rgba(102,126,234,0.08)',
          paddingLeft: '3rem',
          paddingRight: '1.5rem',
          height: '48px',
          fontSize: '1rem',
          color: '#fff',
          outline: 'none'
        }}
      >
        <span style={{ color: '#fff', fontWeight: 500 }}>
          {selectedCategory === 'all' 
            ? 'All Categories' 
            : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </span>
      </button>
      <ul 
        className="dropdown-menu w-100"
        aria-labelledby="categoryDropdown"
        style={{
          borderRadius: '1rem',
          boxShadow: '0 2px 8px rgba(102,126,234,0.12)',
          marginTop: '0.5rem',
          minWidth: '220px'
        }}
      >
        <li>
          <button 
            className={`dropdown-item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
            style={{ fontWeight: selectedCategory === 'all' ? 600 : 400 }}
          >
            All Categories
          </button>
        </li>
        {categories.map(category => (
          <li key={category}>
            <button 
              className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              style={{ fontWeight: selectedCategory === category ? 600 : 400 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
