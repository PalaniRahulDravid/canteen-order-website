import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const handlePay = () => {
    // Get cart and user
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!cart.length) {
      alert('Cart is empty!');
      return;
    }

    // Calculate totals
    const orderAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = +(orderAmount * 0.05).toFixed(2);
    const total = +(orderAmount + gst).toFixed(2);

    // Create order object
    const order = {
      _id: Date.now().toString(),
      items: cart,
      total,
      status: 'Completed',
      createdAt: new Date().toISOString(),
      user: user.email || 'guest'
    };

    // Save to orders in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Dummy payment success
    alert('Payment Successful! 🎉\nThank you for your order.');
    navigate('/orders');
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