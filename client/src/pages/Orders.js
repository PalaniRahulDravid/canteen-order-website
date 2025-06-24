import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    setOrders(stored ? JSON.parse(stored) : []);
  }, []);

  // Show toast if redirected from scanner with success
  useEffect(() => {
    if (location.state && location.state.received) {
      setToast('🎉 All items received successfully!');
      setTimeout(() => setToast(''), 2000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Check if all items in the order are received
  const isOrderReceived = (order) => {
    return order.items.every(item =>
      localStorage.getItem(`received_${order._id}_${item.id}`) === 'true'
    );
  };

  // Navigate to scanner with order info
  const handleQRScan = (orderId, items) => {
    navigate('/scanner', { state: { orderId, itemIds: items.map(i => i.id) } });
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.slice().reverse().map(order => {
            const received = isOrderReceived(order);
            return (
              <div className="order-card card" key={order._id}>
                <div className="order-header">
                  <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <div className="order-items">
                  {order.items.map(item => (
                    <div className="order-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                        onError={e => { e.target.src = '/images/placeholder-food.png'; }}
                      />
                      <div className="order-item-details">
                        <span>{item.name}</span>
                        <span>₹{item.price} x {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  <div
                    className="order-item-qr"
                    onClick={() => !received && handleQRScan(order._id, order.items)}
                    style={{ cursor: received ? 'default' : 'pointer', opacity: received ? 0.6 : 1 }}
                    title={received ? 'Already received' : 'Scan to receive all'}
                  >
                    <QRCodeSVG
                      value={order._id}
                      size={56}
                      bgColor="#fffbe6"
                      fgColor={received ? '#38a169' : '#b7791f'}
                      includeMargin={false}
                    />
                    <div className={`qr-status ${received ? 'received' : 'pending'}`}>
                      {received ? '✅ All Received' : '📷 Scan to Receive All'}
                    </div>
                  </div>
                </div>
                <div className="order-footer">
                  <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
                  <span className="order-total">Total: ₹{order.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#38a169',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: 8,
          fontWeight: 600,
          zIndex: 9999,
          boxShadow: '0 2px 12px rgba(56,161,105,0.18)'
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default Orders;