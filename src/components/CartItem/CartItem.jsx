import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
        updateQuantity(item.id, value);
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const decrementQuantity = () => {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const handleRemove = () => {
        removeFromCart(item.id);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
            </div>

            <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>

                <div className="cart-item-controls">
                    <div className="cart-quantity-controls">
                        <button
                            className="cart-quantity-btn"
                            onClick={decrementQuantity}
                            type="button"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="cart-quantity-input"
                            min="1"
                            max="99"
                        />
                        <button
                            className="cart-quantity-btn"
                            onClick={incrementQuantity}
                            type="button"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="remove-item-btn"
                        onClick={handleRemove}
                        type="button"
                        aria-label="Remove item"
                    >
                        🗑️
                    </button>
                </div>

                <div className="cart-item-total">
                    Subtotal: ${(item.price * quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired
};

export default CartItem;