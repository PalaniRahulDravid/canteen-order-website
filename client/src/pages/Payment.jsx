import React from 'react';

function Payment() {
  return (
    <div style={{
      maxWidth: 420,
      margin: '60px auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 12px #eee',
      padding: 32,
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#b7791f', marginBottom: 18 }}>Payment - Coming Soon!</h2>
      <p style={{ fontSize: 18, color: '#444' }}>
        Online payment will be available soon.<br />
        For now, please pay at the counter after placing your order.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
        alt="Payment Coming Soon"
        style={{ width: 120, marginTop: 24, opacity: 0.7 }}
      />
    </div>
  );
}

export default Payment;