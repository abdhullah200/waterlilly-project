import { useEffect, useState } from 'react';
import { getProducts, Product } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {products.map(p => (
        <div key={p.id} className="col">
          <div className="card h-100">
            <img src={p.image} className="card-img-top" alt={p.title} />
            <div className="card-body">
              <h6 className="card-title">{p.title}</h6>
              <p className="fw-bold text-primary">${p.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;