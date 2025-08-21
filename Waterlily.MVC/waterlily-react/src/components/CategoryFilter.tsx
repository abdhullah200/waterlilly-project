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
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary dropdown-toggle w-100 d-flex justify-content-between align-items-center" 
        type="button" 
        id="categoryDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        <span>
          {selectedCategory === 'all' 
            ? 'All Categories' 
            : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </span>
      </button>
      <ul className="dropdown-menu w-100" aria-labelledby="categoryDropdown">
        <li>
          <button 
            className={`dropdown-item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </button>
        </li>
        {categories.map(category => (
          <li key={category}>
            <button 
              className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
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
