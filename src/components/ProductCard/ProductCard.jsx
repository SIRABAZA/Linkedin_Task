import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import toast from "react-hot-toast";
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const dispatch = useDispatch();

  // Simple variants for demo
  const variants = [
    { id: "default", name: "Default", price: product.price },
    { id: "premium", name: "Premium", price: (product.price * 1.2).toFixed(2) },
    { id: "deluxe", name: "Deluxe", price: (product.price * 1.5).toFixed(2) }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant);
  const isOutOfStock = product.stock === 0 || product.stock === undefined;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock!");
      return;
    }
    
    const productWithVariant = {
      ...product,
      selectedVariant: currentVariant,
      price: parseFloat(currentVariant.price)
    };
    
    dispatch(addCart(productWithVariant));
    toast.success("Added to cart!");
  };

  return (
    <div className={styles.productCard}>
      {/* Product Image */}
      <div className={styles.productImageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.productImage}
        />
        {isOutOfStock && (
          <div className={styles.outOfStockOverlay}>
            <span>Out of Stock</span>
          </div>
        )}
        <div className={styles.productActions}>
          <button 
            className={styles.quickViewBtn}
            onClick={() => toast.success("Quick view feature coming soon!")}
            title="Quick view"
          >
            <i className="fa fa-eye"></i>
          </button>
          <button 
            className={styles.wishlistBtn}
            onClick={() => toast.success("Added to wishlist!")}
            title="Add to wishlist"
          >
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        {/* Category */}
        <div className={styles.productCategory}>
          {product.category}
        </div>

        {/* Product Name */}
        <h3 className={styles.productTitle}>
          {product.title.length > 50 
            ? `${product.title.substring(0, 50)}...` 
            : product.title
          }
        </h3>

        {/* Rating */}
        <div className={styles.productRating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <i 
                key={index}
                className={`fa fa-star ${index < Math.floor(product.rating?.rate || 0) ? styles.filled : ''}`}
              ></i>
            ))}
          </div>
          <span className={styles.ratingCount}>({product.rating?.count || 0})</span>
        </div>

        {/* Price */}
        <div className={styles.productPrice}>
          <span className={styles.currentPrice}>${currentVariant.price}</span>
          {selectedVariant !== "default" && (
            <span className={styles.originalPrice}>${product.price}</span>
          )}
        </div>

        {/* Variant Selector */}
        <div className={styles.variantSelector}>
          <select 
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className={styles.variantDropdown}
            disabled={isOutOfStock}
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} - ${variant.price}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button 
          className={`${styles.addToCartBtn} ${isOutOfStock ? styles.disabled : ''}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? (
            <>
              <i className="fa fa-times"></i>
              Out of Stock
            </>
          ) : (
            <>
              <i className="fa fa-shopping-cart"></i>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 