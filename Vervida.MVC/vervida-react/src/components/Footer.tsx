import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="text-white py-5"
      style={{
        background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
        boxShadow: '0 -2px 16px rgba(102,126,234,0.12)',
        backdropFilter: 'blur(6px)',
        marginTop: '3rem'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold d-flex align-items-center" style={{ color: '#fff' }}>
              Vervida
            </h5>
            <p className="text-white-50 mb-2">Your one-stop shop for high-quality products at affordable prices.</p>
            <p className="text-white-50 mb-0">123 Shopping Avenue<br />Commerce City, WL 12345</p>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 id="contact" className="fw-bold" style={{ color: '#fff' }}>Contact Us</h5>
            <ul className="list-unstyled text-white-50 mb-0">
              <li><i className="bi bi-telephone me-2 text-info"></i> (123) 456-7890</li>
              <li><i className="bi bi-envelope me-2 text-info"></i> info@Vervida.com</li>
              <li><i className="bi bi-clock me-2 text-info"></i> Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: '#fff' }}>Follow Us</h5>
            <div className="d-flex gap-3 fs-4 mb-3">
              <a href="#" className="text-white" style={{ opacity: 0.85 }}><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white" style={{ opacity: 0.85 }}><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white" style={{ opacity: 0.85 }}><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white" style={{ opacity: 0.85 }}><i className="bi bi-linkedin"></i></a>
            </div>
            
            <div className="mt-3">
              <h5 className="fw-bold" style={{ color: '#fff' }}>Newsletter</h5>
              <div className="input-group" style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(102,126,234,0.08)' }}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  style={{
                    border: 'none',
                    borderRadius: '2rem 0 0 2rem',
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: 500,
                    paddingLeft: '1.2rem'
                  }}
                />
                <button
                  className="btn"
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '0 2rem 2rem 0'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0 text-white-50">© 2025 Vervida. All rights reserved by Abdhullah Ariff.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-white-50 text-decoration-underline">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white-50 text-decoration-underline">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
