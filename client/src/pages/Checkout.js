import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const handlePay = async () => {
    // Get cart and user
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!cart.length) {
      alert('Cart is empty!');
      return;
    }

    // Prepare items for backend
    const items = cart.map(item => ({
      item: item.id, // id is _id from backend
      quantity: item.quantity
    }));

    // Place order via API
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, items })
    });

    if (res.ok) {
      alert('Payment Successful! 🎉\nThank you for your order.');
      localStorage.removeItem('cart');
      navigate('/orders');
    } else {
      alert('Order failed. Please try again.');
    }
  };

  // ...rest of your component remains unchanged...
  // (You can keep the summary UI as is)
  // Just update the handlePay function as above

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
            <span>₹ <b>{localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).reduce((sum, item) => sum + item.price * item.quantity, 0) : 0}</b></span>
          </div>
          <div>
            <span>GST (5%)</span>
            <span>
              ₹ <b>
                {localStorage.getItem('cart')
                  ? (JSON.parse(localStorage.getItem('cart')).reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05).toFixed(2)
                  : '0.00'}
              </b>
            </span>
          </div>
          <div className="checkout-total">
            <span>Total Payable</span>
            <span>
              ₹ <b>
                {localStorage.getItem('cart')
                  ? (
                      JSON.parse(localStorage.getItem('cart')).reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.05
                    ).toFixed(2)
                  : '0.00'}
              </b>
            </span>
          </div>
        </div>
        <button className="checkout-pay-btn" onClick={handlePay}>
          Pay Now
        </button>
        <p className="checkout-note">* This is a demo payment page. No real money will be deducted.</p>
      </div>
    </div>
  );
}

export default Checkout;