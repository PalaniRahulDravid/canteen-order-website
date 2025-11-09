import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = (total * 0.05).toFixed(2);
  const grandTotal = (total * 1.05).toFixed(2);

  const handlePay = async () => {
    if (!cart.length) {
      alert('Cart is empty!');
      return;
    }
    setSuccess(true);

    // Place order in backend after showing dummy message
    setTimeout(async () => {
      if (!user.id) {
        navigate('/orders');
        return;
      }
      const items = cart.map(item => ({
        item: item.id,
        quantity: item.quantity
      }));
      try {
        await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, items })
        });
        localStorage.removeItem('cart');
      } catch (err) {
        // Optionally show an error message
      }
      navigate('/orders');
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
          alt="Payment"
          className="checkout-img"
        />
        <h2 className="checkout-title">Canteen Payment</h2>
        <div className="checkout-summary">
          <div>
            <span>Order Amount</span>
            <span>₹ <b>{total}</b></span>
          </div>
          <div>
            <span>GST (5%)</span>
            <span>₹ <b>{gst}</b></span>
          </div>
          <div className="checkout-total">
            <span>Total Payable</span>
            <span>₹ <b>{grandTotal}</b></span>
          </div>
        </div>
        <button className="checkout-pay-btn" onClick={handlePay} disabled={success}>
          Pay Now
        </button>
        <p className="checkout-note">* This is a demo payment page. No real money will be deducted.</p>
        {success && (
          <div style={{
            marginTop: 18,
            color: '#38a169',
            fontWeight: 600,
            fontSize: '1.2rem'
          }}>
            Payment Successful! Redirecting to Orders...
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;