import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
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

    clearCart(); // clears cart context
    alert('Order placed successfully!');
    navigate('/orders'); // redirect to orders page
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div>
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
                <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹ {total}</h3>
          <button onClick={placeOrder} style={styles.orderBtn}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    gap: '15px',
  },
  image: {
    width: '100px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  removeBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '5px',
  },
  orderBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '15px',
    fontSize: '16px',
  },
};

export default Cart;
