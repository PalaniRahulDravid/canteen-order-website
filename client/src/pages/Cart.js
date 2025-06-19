import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      const updated = localStorage.getItem('cart');
      setCartItems(updated ? JSON.parse(updated) : []);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    setCartItems(saved ? JSON.parse(saved) : []);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncrement = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrement = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-main-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty-box">
          <img src="/images/empty-cart.svg" alt="Empty Cart" className="cart-empty-img" />
          <p className="cart-empty-text">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-table-header">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Remove</span>
            </div>
            {cartItems.map(item => (
              <div className="cart-table-row" key={item.id}>
                <div className="cart-item-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={e => { e.target.src = '/images/placeholder-food.png'; }}
                  />
                  <span className="cart-item-name">{item.name}</span>
                </div>
                <span className="cart-item-price">₹{item.price}</span>
                <div className="cart-qty-controls">
                  <button className="cart-qty-btn" onClick={() => handleDecrement(item.id)}><FaMinus /></button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button className="cart-qty-btn" onClick={() => handleIncrement(item.id)}><FaPlus /></button>
                </div>
                <span className="cart-item-total">₹{item.price * item.quantity}</span>
                <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-grand-total">
              <span>Total Amount:</span>
              <span className="cart-total">₹{total}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;