import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  searchTerm: string;
  onClick: () => void;
  onAddToCart?: () => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  searchTerm, 
  onClick, 
  onAddToCart,
  index = 0 
}) => {
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
          regex.test(part) ? <mark key={i} className="bg-warning text-dark px-1 rounded">{part}</mark> : part
        )}
      </>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating?: { rate: number; count: number }) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-muted"></i>);
    }
    
    return (
      <div className="d-flex align-items-center gap-1 mb-2">
        <div className="d-flex" style={{ fontSize: '0.8rem' }}>
          {stars}
        </div>
        <small className="text-muted">({rating.count})</small>
      </div>
    );
  };

  return (
    <div 
      className="card glass h-100 product-card fade-in-up" 
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Image Section */}
      <div className="position-relative overflow-hidden">
        <img 
          src={product.image} 
          className="card-img-top p-3" 
          alt={product.title}
          style={{ 
            height: '200px', 
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            zIndex: 1,
            position: 'relative'
          }} 
        />
        {/* Category Badge */}
        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 3 }}>
          <span className="badge px-2 py-1" style={{ fontSize: '0.7rem' }}>
            {product.category}
          </span>
        </div>
        
        {/* Quick Add Button - appears on hover */}
        {onAddToCart && (
          <div 
            className="position-absolute top-50 start-50 translate-middle opacity-0 quick-add-btn"
            style={{
              zIndex: 2,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '1rem',
              padding: '0.5rem 1rem'
            }}
          >
            <button 
              className="btn btn-modern btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              data-product-id={product.id}
              title="Quick Add to Cart"
            >
              <i className="bi bi-cart-plus me-1"></i>
              Add to Cart
            </button>
          </div>
        )}
      </div>
      
      {/* Card Body */}
      <div className="card-body d-flex flex-column p-3">
        {/* Rating */}
        {renderStars(product.rating)}
        
        {/* Title */}
        <h6 className="card-title mb-2" style={{ 
          fontSize: '0.95rem', 
          lineHeight: '1.3',
          height: '2.6rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {highlightText(product.title, searchTerm)}
        </h6>
        
        {/* Price */}
        <div className="mt-auto">
          <div className="price-tag mb-3">
            {formatPrice(product.price)}
          </div>
          
          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <button 
              className="btn btn-modern flex-grow-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              style={{ fontSize: '0.85rem' }}
            >
              <i className="bi bi-eye me-1"></i>
              View Details
            </button>
            
            {onAddToCart && (
              <button 
                className="btn btn-outline-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                data-product-id={product.id}
                title="Add to Cart"
                style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;