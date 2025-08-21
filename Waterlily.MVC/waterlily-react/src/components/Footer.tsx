import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>🌸 Waterlily</h5>
            <p>Your one-stop shop for high-quality products at affordable prices.</p>
            <p>123 Shopping Avenue<br />Commerce City, WL 12345</p>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 id="contact">Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-telephone me-2"></i> (123) 456-7890</li>
              <li><i className="bi bi-envelope me-2"></i> info@waterlily.com</li>
              <li><i className="bi bi-clock me-2"></i> Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
            
            <div className="mt-4">
              <h5>Newsletter</h5>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">© 2023 Waterlily. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="#" className="text-white">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="#" className="text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
