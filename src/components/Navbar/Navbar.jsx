import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import './Navbar.css';

const Navbar = () => {
    const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleCheckout = () => {
        alert(`Thank you for your purchase! Total: $${getTotalPrice().toFixed(2)}`);
        clearCart();
        setIsCartOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        Shop RENNAH
                    </Link>

                    <div className="navbar-menu">
                        <Link
                            to="/"
                            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className={`navbar-link ${location.pathname === '/shop' ? 'active' : ''}`}
                        >
                            Shop
                        </Link>

                        <button className="cart-button" onClick={toggleCart}>
                            🛒 Cart ({getTotalItems()})
                        </button>
                    </div>
                </div>
            </nav>

            {isCartOpen && (
                <div className="cart-overlay" onClick={toggleCart}>
                    <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h3>Shopping Cart</h3>
                            <button className="close-cart" onClick={toggleCart}>
                                ✕
                            </button>
                        </div>

                        <div className="cart-content">
                            {cart.length === 0 ? (
                                <p className="empty-cart">Your cart is empty</p>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cart.map((item) => (
                                            <CartItem key={item.id} item={item} />
                                        ))}
                                    </div>

                                    <div className="cart-footer">
                                        <div className="cart-total">
                                            <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                                        </div>
                                        <div className="cart-actions">
                                            <button
                                                className="btn btn-danger"
                                                onClick={clearCart}
                                                disabled={cart.length === 0}
                                            >
                                                Clear Cart
                                            </button>
                                            <button
                                                className="btn btn-success"
                                                onClick={handleCheckout}
                                                disabled={cart.length === 0}
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;