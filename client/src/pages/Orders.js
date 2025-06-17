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
      <h2 style={styles.heading}>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>You haven't placed any orders yet.</p>
      ) : (
        <div style={styles.orderList}>
          {orders.map((order, index) => (
            <div key={index} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <h4>Order #{index + 1}</h4>
                <p style={styles.date}>🕒 {order.date}</p>
              </div>

              <div style={styles.itemsContainer}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={styles.itemRow}>
                    <img src={item.image} alt={item.name} style={styles.image} />
                    <div>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.price}>₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.footer}>
                <strong>Total: ₹ {order.total}</strong>
                <button onClick={() => deleteOrder(index)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1000px',
    margin: 'auto',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '30px',
    color: '#333',
  },
  empty: {
    fontSize: '18px',
    color: '#888',
    textAlign: 'center',
    marginTop: '50px',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  orderCard: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  date: {
    fontSize: '14px',
    color: '#666',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  itemRow: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    borderBottom: '1px dashed #eee',
    paddingBottom: '10px',
  },
  image: {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  itemName: {
    marginBottom: '4px',
    fontWeight: 'bold',
  },
  price: {
    color: '#28a745',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Orders;
