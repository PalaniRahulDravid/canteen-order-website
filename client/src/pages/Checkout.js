import React from 'react';

function Checkout() {
  return (
    <div style={{
      maxWidth: 400,
      margin: '60px auto',
      padding: 32,
      background: '#fffbe6',
      borderRadius: 16,
      boxShadow: '0 2px 16px rgba(251, 211, 141, 0.18)',
      textAlign: 'center'
    }}>
      <h2 style={{color: '#b7791f'}}>Payment Coming Soon</h2>
      <p style={{color: '#4a5568', fontSize: '1.1rem'}}>This is a demo checkout page.<br />Payment integration will be available soon!</p>
    </div>
  );
}

export default Checkout;