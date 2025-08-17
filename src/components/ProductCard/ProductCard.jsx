import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            addToCart(product, quantity);
            // Reset quantity after adding to cart
            setQuantity(1);

            // Show brief success feedback
            setTimeout(() => {
                setIsAdding(false);
            }, 500);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setIsAdding(false);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>

                <div className="product-description">
                    <p>{product.description.substring(0, 100)}...</p>
                </div>

                <div className="product-rating">
                    <span className="rating-stars">
                        {'★'.repeat(Math.floor(product.rating?.rate || 0))}
                        {'☆'.repeat(5 - Math.floor(product.rating?.rate || 0))}
                    </span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                </div>

                <div className="quantity-controls">
                    <label htmlFor={`quantity-${product.id}`} className="quantity-label">
                        Quantity:
                    </label>
                    <div className="quantity-input-group">
                        <button
                            className="quantity-btn"
                            onClick={decrementQuantity}
                            type="button"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <input
                            id={`quantity-${product.id}`}
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                            min="1"
                            max="99"
                        />
                        <button
                            className="quantity-btn"
                            onClick={incrementQuantity}
                            type="button"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number,
            count: PropTypes.number
        })
    }).isRequired
};

export default ProductCard;