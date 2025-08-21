// src/App.tsx
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
// Remove socket import if WebSocket isn't needed
// import socket from './socket';

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
  
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try multiple API endpoints in order of preference
        const endpoints = [
          // Try your backend API first
          window.location.origin.replace('-3000', '-3001') + '/api/products',
          // Fallback to fake store API for demo purposes
          'https://fakestoreapi.com/products'
        ];

        let productsData: Product[] = [];
        let success = false;

        for (const endpoint of endpoints) {
          try {
            console.log(`Attempting to fetch products from: ${endpoint}`);
            const response = await axios.get<Product[]>(endpoint, {
              timeout: 10000, // 10 second timeout
              headers: {
                'Content-Type': 'application/json',
              }
            });
            
            productsData = response.data;
            success = true;
            console.log(`Successfully loaded ${productsData.length} products from ${endpoint}`);
            break;
          } catch (endpointError) {
            console.warn(`Failed to fetch from ${endpoint}:`, endpointError);
            continue;
          }
        }

        if (!success) {
          throw new Error('All API endpoints failed');
        }

        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsData.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
        setError(null);
        
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please check your backend server or try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, products]);

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle product click to show modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Add product to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    // Show cart after adding item
    setShowCart(true);
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update product quantity in cart
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

  // Calculate total cart value
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Remove WebSocket initialization if not needed
  // useEffect(() => {
  //   console.log('Socket initialized in App component');
  //   
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        cartItemCount={cartItemCount} 
        onCartClick={() => setShowCart(true)} 
      />
      
      <main className="container py-4 flex-grow-1">
        <section id="home" className="mb-5">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Waterlily Products</h1>
              <p className="col-md-8 fs-4">Browse our collection of high-quality products.</p>
            </div>
          </div>
        </section>
        
        <section id="products" className="mb-5">
          <h2 className="mb-4">Our Products</h2>
          
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            </div>
            <div className="col-md-6 mb-3">
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            </div>
          </div>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
              <details className="mt-2">
                <summary>Troubleshooting Tips</summary>
                <ul className="mt-2">
                  <li>Make sure your backend server is running on port 3001</li>
                  <li>Check that the `/api/products` endpoint is working</li>
                  <li>Verify CORS is properly configured on your backend</li>
                </ul>
              </details>
            </div>
          )}
          
          <div className="row g-4">
            {loading ? (
              // Show skeletons while loading
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <Skeleton height={200} />
                    <div className="card-body">
                      <Skeleton count={3} />
                    </div>
                  </div>
                </div>
              ))
            ) : currentProducts.length > 0 ? (
              // Show products
              currentProducts.map(product => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                  <ProductCard 
                    product={product} 
                    searchTerm={searchTerm}
                    onClick={() => handleProductClick(product)} 
                  />
                </div>
              ))
            ) : (
              // No products found
              <div className="col-12">
                <div className="alert alert-info">
                  <strong>No products found</strong> matching your criteria.
                  {searchTerm && <span> Try clearing your search term.</span>}
                  {selectedCategory !== 'all' && <span> Try selecting "All Categories".</span>}
                </div>
              </div>
            )}
          </div>
          
          {filteredProducts.length > productsPerPage && (
            <div className="mt-4">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </section>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          show={showModal} 
          onClose={() => setShowModal(false)} 
          onAddToCart={addToCart} 
        />
      )}
      
      {/* Shopping Cart Sidebar */}
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