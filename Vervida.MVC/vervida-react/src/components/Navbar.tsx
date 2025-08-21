import React from 'react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartClick }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = sectionId;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <span className="fw-bold">Vervida</span>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <i className="bi bi-house me-2"></i>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => {
                  const element = document.querySelector('.row.g-4');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <i className="bi bi-grid me-2"></i>
                Products
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => scrollToSection('contact')}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact
              </button>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="d-flex align-items-center gap-3">
            {/* Search Toggle (for mobile) */}
            <button 
              className="btn d-lg-none"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                color: 'rgba(255, 255, 255, 0.9)',
                width: '40px',
                height: '40px'
              }}
              title="Search"
            >
              <i className="bi bi-search"></i>
            </button>

            {/* Wishlist Button (placeholder for future feature) */}
            <button 
              className="btn position-relative d-none d-md-flex"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                color: 'rgba(255, 255, 255, 0.9)',
                width: '40px',
                height: '40px'
              }}
              title="Wishlist"
            >
              <i className="bi bi-heart"></i>
            </button>

            {/* Cart Button */}
            <button 
              className="btn btn-cart position-relative d-flex align-items-center gap-2" 
              onClick={onCartClick}
              title="Shopping Cart"
            >
              <i className="bi bi-bag"></i>
              <span className="d-none d-sm-inline">Cart</span>
              
              {/* Cart Badge */}
              {cartItemCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    fontSize: '0.7rem',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;