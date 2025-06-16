import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [successMsg, setSuccessMsg] = useState('');
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const placeOrder = () => {
    const newOrder = {
      items: cartItems,
      total,
      date: new Date().toLocaleString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    clearCart();
    setSuccessMsg('🎉 Order placed successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/orders');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <div style={styles.cartArea}>
          <div style={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <img src={item.image} alt={item.name} style={styles.image} />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.price}>₹ {item.price}</p>
                  <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summaryBox}>
            <h3>Price Details</h3>
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ₹ {total}</p>
            <button onClick={placeOrder} style={styles.orderBtn}>
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {successMsg && <div style={styles.toast}>{successMsg}</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'sans-serif',
    maxWidth: '1000px',
    margin: 'auto',
  },
  heading: {
    marginBottom: '30px',
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
  cartArea: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    flexWrap: 'wrap',
  },
  cartList: {
    flex: '3',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  itemCard: {
    display: 'flex',
    gap: '15px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  image: {
    width: '120px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    margin: '0 0 5px 0',
  },
  price: {
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  removeBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  summaryBox: {
    flex: '1',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    height: 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  orderBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '5px',
    marginTop: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  toast: {
  position: 'fixed',
  top: '80px',
  right: '20px',
  background: 'linear-gradient(135deg, #007bff, #3399ff)',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '10px',
  boxShadow: '2px 2px 12px rgba(0,0,0,0.25)',
  fontSize: '16px',
  fontWeight: '500',
  zIndex: 9999,
}
};

export default Cart;
