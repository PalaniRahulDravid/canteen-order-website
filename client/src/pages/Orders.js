import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend (adjust endpoint as needed)
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card card" key={order._id}>
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div className="order-items">
                {order.items.map(item => (
                  <div className="order-item" key={item._id}>
                    <img
                      src={item.imageUrl}
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