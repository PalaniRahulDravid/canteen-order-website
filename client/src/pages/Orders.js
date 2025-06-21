import React, { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage
    const stored = localStorage.getItem('orders');
    setOrders(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders
            .slice()
            .reverse()
            .map(order => (
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
                </div>
                <div className="order-footer">
                  <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
                  <span className="order-total">Total: ₹{order.total}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Orders;