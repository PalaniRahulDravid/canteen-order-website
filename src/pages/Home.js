import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Home() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    }
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMsg(`${item.name} added to cart ✅`);
    setTimeout(() => setToastMsg(''), 3000); // Toast disappears in 3s
  };

  return (
    <div style={styles.container}>
      <h2>Canteen Menu</h2>

      {menu.length === 0 ? (
        <p>No items available. Please check later!</p>
      ) : (
        <div style={styles.grid}>
          {menu.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
              <button style={styles.addBtn} onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && <div style={styles.toast}>{toastMsg}</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  addBtn: {
    marginTop: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#333',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.3)',
    animation: 'slideIn 0.4s ease-out',
    zIndex: 1000,
  },
};

export default Home;
