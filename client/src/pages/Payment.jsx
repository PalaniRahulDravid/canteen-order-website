import React from 'react';
import './Payment.css'; // ✅ optional external styling for better consistency

function Payment() {
  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Payment - Coming Soon!</h2>
      <p className="payment-text">
        Online payment will be available soon. <br />
        For now, please pay at the counter after placing your order.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
        alt="Payment Coming Soon"
        className="payment-image"
      />
    </div>
  );
}

export default Payment;
