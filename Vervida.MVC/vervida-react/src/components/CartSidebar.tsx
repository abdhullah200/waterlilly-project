import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartSidebarProps {
  cart: Product[];
  show: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  cartTotal: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  cart, 
  show, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  cartTotal 
}) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart3 fs-1 text-muted"></i>
            <p className="mt-3">Your cart is empty</p>
            <Button variant="primary" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items mb-3">
              {cart.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="img-fluid rounded-start p-2" 
                        style={{ maxHeight: '80px', objectFit: 'contain' }} 
                      />
                    </div>
                    <div className="col-9">
                      <div className="card-body py-2">
                        <h6 className="card-title mb-0" style={{ fontSize: '0.9rem' }}>
                          {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                        </h6>
                        <p className="card-text mb-1">
                          <small className="text-primary fw-bold">${item.price.toFixed(2)}</small>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="input-group input-group-sm" style={{ width: '100px' }}>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <input 
                              type="text" 
                              className="form-control text-center" 
                              value={item.quantity} 
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                if (!isNaN(newQty)) {
                                  onUpdateQuantity(item.id, newQty);
                                }
                              }} 
                            />
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <button 
                            className="btn btn-sm text-danger" 
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span className="fw-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold fs-5">Total:</span>
                <span className="fw-bold fs-5">${cartTotal.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-100 mb-2">
                Checkout
              </Button>
              <Button variant="outline-secondary" className="w-100" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
