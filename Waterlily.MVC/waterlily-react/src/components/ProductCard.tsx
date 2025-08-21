import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  searchTerm: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, searchTerm, onClick }) => {
  // Function to highlight search term in title
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? <mark key={i}>{part}</mark> : part
        )}
      </>
    );
  };

  return (
    <div className="card h-100 shadow-sm product-card" onClick={onClick}>
      <div className="position-relative">
        <img 
          src={product.image} 
          className="card-img-top p-3" 
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }} 
        />
        <span className="position-absolute top-0 end-0 badge bg-primary m-2">
          {product.category}
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: '1rem' }}>
          {highlightText(product.title, searchTerm)}
        </h5>
        <p className="card-text mt-auto">
          <span className="fw-bold text-primary fs-5">${product.price.toFixed(2)}</span>
        </p>
        <button className="btn btn-outline-primary mt-2" onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          onClick();
        }}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
