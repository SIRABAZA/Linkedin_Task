import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Navbar, Footer } from "../components";
import "./ProductCardDemo.css";

const ProductCardDemo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products?limit=8");
        const data = await response.json();
        
        // Add some products with out of stock status for demo
        const productsWithStock = data.map((product, index) => ({
          ...product,
          stock: index === 2 ? 0 : Math.floor(Math.random() * 50) + 10 // Product at index 2 is out of stock
        }));
        
        setProducts(productsWithStock);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="demo-container">
          <div className="demo-header">
            <h1>Product Card UI Demo</h1>
            <p>Clean and simple product cards with modern design</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="demo-container">
        <div className="demo-header">
          <h1>Product Card UI Demo</h1>
          <p>Clean and simple product cards with modern design</p>
          <div className="demo-features">
            <div className="feature">
              <i className="fa fa-mobile"></i>
              <span>Responsive</span>
            </div>
            <div className="feature">
              <i className="fa fa-star"></i>
              <span>Rating</span>
            </div>
            <div className="feature">
              <i className="fa fa-tags"></i>
              <span>Variants</span>
            </div>
            <div className="feature">
              <i className="fa fa-shopping-cart"></i>
              <span>Add to Cart</span>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="demo-info">
          <h2>Features Implemented</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>✅ Product Image</h3>
              <p>Clean product images with subtle hover effects</p>
            </div>
            <div className="feature-card">
              <h3>✅ Product Name</h3>
              <p>Clear typography with proper text truncation</p>
            </div>
            <div className="feature-card">
              <h3>✅ Product Price</h3>
              <p>Dynamic pricing with variant selection support</p>
            </div>
            <div className="feature-card">
              <h3>✅ Variant Options</h3>
              <p>Simple dropdown for different product variants</p>
            </div>
            <div className="feature-card">
              <h3>✅ Add to Cart Button</h3>
              <p>Clear call-to-action with proper states</p>
            </div>
            <div className="feature-card">
              <h3>✅ Out of Stock State</h3>
              <p>Clear indication when products are unavailable</p>
            </div>
            <div className="feature-card">
              <h3>✅ Modern Design</h3>
              <p>Clean, minimal layout following modern UI principles</p>
            </div>
            <div className="feature-card">
              <h3>✅ Responsive Layout</h3>
              <p>Works perfectly on all device sizes</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCardDemo; 