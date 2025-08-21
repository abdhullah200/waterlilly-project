import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductModalProps {
  product: Product;
  show: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, show, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning me-1"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning me-1"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning me-1"></i>);
    }
    
    return stars;
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mb-3">
            <img 
              src={product.image} 
              alt={product.title} 
              className="img-fluid" 
              style={{ maxHeight: '300px', objectFit: 'contain' }} 
            />
          </div>
          <div className="col-md-6">
            <h5>Description</h5>
            <p>{product.description}</p>
            
            <div className="mb-3">
              <span className="badge bg-primary me-2">{product.category}</span>
              <span className="fw-bold text-primary fs-4">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-2">
                  {renderStars(product.rating.rate)}
                </div>
                <span>({product.rating.rate}) - {product.rating.count} reviews</span>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="quantity" className="me-2">Quantity:</label>
              <div className="input-group" style={{ width: '150px' }}>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </Button>
                <input 
                  type="number" 
                  id="quantity" 
                  className="form-control text-center" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  min="1" 
                />
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
