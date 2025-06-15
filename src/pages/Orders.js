import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const deleteOrder = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div style={styles.orderList}>
          {orders.map((order, index) => (
            <div key={index} style={styles.orderCard}>
              <h4>Order #{index + 1}</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ₹{item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><small>{order.date}</small></p>
              <button onClick={() => deleteOrder(index)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  orderCard: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Orders;
