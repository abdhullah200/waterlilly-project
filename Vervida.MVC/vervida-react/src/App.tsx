// src/App.tsx - Modern Version
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './App.css'; // Our modern CSS file

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

interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const productsPerPage = 12; // Increased for better grid layout

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const endpoints = [
          window.location.origin.replace('-3000', '-5217') + '/api/products',
          'https://fakestoreapi.com/products'
        ];

        let productsData: Product[] = [];
        let success = false;

        for (const endpoint of endpoints) {
          try {
            console.log(`🚀 Fetching products from: ${endpoint}`);
            const response = await axios.get<Product[]>(endpoint, {
              timeout: 10000,
              headers: {
                'Content-Type': 'application/json',
              }
            });
            
            productsData = response.data;
            success = true;
            console.log(`✅ Successfully loaded ${productsData.length} products`);
            break;
          } catch (endpointError) {
            console.warn(`❌ Failed to fetch from ${endpoint}:`, endpointError);
            continue;
          }
        }

        if (!success) {
          throw new Error('All API endpoints failed');
        }

        // Add stagger animation delay for initial load
        setTimeout(() => {
          setProducts(productsData);
          setFilteredProducts(productsData);
          
          const uniqueCategories = [...new Set(productsData.map(product => product.category))];
          setCategories(uniqueCategories);
          
          setLoading(false);
          setError(null);
          setIsInitialLoad(false);
        }, isInitialLoad ? 800 : 0);
        
      } catch (err) {
        console.error('💥 Error loading products:', err);
        setError('Failed to load products. Please check your connection and try again.');
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchProducts();
  }, []);

  // Enhanced filtering with debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let result = products;
      
      if (selectedCategory !== 'all') {
        result = result.filter(product => 
          product.category === selectedCategory
        );
      }
      
      if (searchTerm) {
        result = result.filter(product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredProducts(result);
      setCurrentPage(1);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, products]);

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    // Show brief success animation
    const btn = document.querySelector(`[data-product-id="${product.id}"]`);
    if (btn) {
      btn.classList.add('btn-success');
      setTimeout(() => btn.classList.remove('btn-success'), 1000);
    }
    
    setShowCart(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Enhanced skeleton loading
  const renderSkeletons = () => (
    Array(12).fill(0).map((_, i) => (
      <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card glass" style={{ animationDelay: `${i * 0.1}s` }}>
          <Skeleton height={200} className="card-img-top" />
          <div className="card-body">
            <Skeleton count={2} className="mb-2" />
            <Skeleton width="60%" />
            <div className="mt-3">
              <Skeleton height={38} />
            </div>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        cartItemCount={cartItemCount} 
        onCartClick={() => setShowCart(true)} 
      />
      
      <main className="container-fluid px-4 py-4 flex-grow-1">
        {/* Hero Section */}
        <section className="hero-section mb-5 fade-in-up">
          <div className="container-fluid">
            <h1 className="hero-title">✨ Vervida Collection</h1>
            <p className="hero-subtitle">Discover amazing products with modern shopping experience</p>
            
            {!loading && (
              <div className="mt-4">
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  <div className="badge fs-6 px-3 py-2">
                    <i className="bi bi-box-seam me-2"></i>
                    {filteredProducts.length} Products
                  </div>
                  <div className="badge fs-6 px-3 py-2">
                    <i className="bi bi-tags me-2"></i>
                    {categories.length} Categories
                  </div>
                  <div className="badge fs-6 px-3 py-2">
                    <i className="bi bi-star me-2"></i>
                    Premium Quality
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="mb-5">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="search-container">
                <SearchBar 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            </div>
          </div>
        </section>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-4 text-center">
            <p className="text-muted">
              {filteredProducts.length === products.length 
                ? `Showing all ${filteredProducts.length} products`
                : `Found ${filteredProducts.length} products`
              }
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="alert alert-danger glass fade-in-up" role="alert">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Connection Error</strong>
            </div>
            <p className="mb-3">{error}</p>
            <details>
              <summary className="btn btn-sm btn-outline-danger">Troubleshooting Tips</summary>
              <ul className="mt-3">
                <li>Ensure your backend server is running on the correct port</li>
                <li>Check that the `/api/products` endpoint is accessible</li>
                <li>Verify CORS configuration allows requests from this domain</li>
                <li>Try refreshing the page or check your internet connection</li>
              </ul>
            </details>
          </div>
        )}
        
        {/* Products Grid */}
        <section>
          <div className="row g-4">
            {loading ? (
              renderSkeletons()
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="col-sm-6 col-md-4 col-lg-3 mb-4"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard 
                    product={product} 
                    searchTerm={searchTerm}
                    onClick={() => handleProductClick(product)}
                    onAddToCart={() => addToCart(product)}
                    index={index}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info glass text-center fade-in-up">
                  <div className="py-5">
                    <i className="bi bi-search display-1 text-muted mb-3"></i>
                    <h4>No Products Found</h4>
                    <p className="mb-3">We couldn't find any products matching your criteria.</p>
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      {searchTerm && (
                        <button 
                          className="btn btn-modern"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear Search
                        </button>
                      )}
                      {selectedCategory !== 'all' && (
                        <button 
                          className="btn btn-modern"
                          onClick={() => setSelectedCategory('all')}
                        >
                          All Categories
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {filteredProducts.length > productsPerPage && !loading && (
            <div className="mt-5 d-flex justify-content-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </section>

        {/* Back to Top Button */}
        <button 
          className="btn btn-modern position-fixed bottom-0 end-0 m-4 rounded-circle"
          style={{ width: '50px', height: '50px', zIndex: 1000 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      </main>
      
      <Footer />
      
      {/* Modals and Sidebars */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          show={showModal} 
          onClose={() => setShowModal(false)} 
          onAddToCart={addToCart} 
        />
      )}
      
      <CartSidebar 
        cart={cart} 
        show={showCart} 
        onClose={() => setShowCart(false)} 
        onUpdateQuantity={updateQuantity} 
        onRemoveItem={removeFromCart} 
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default App;