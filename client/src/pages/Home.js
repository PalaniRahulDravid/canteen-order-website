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
    setTimeout(() => setToastMsg(''), 3000);
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
              <div style={styles.infoRow}>
                <h4 style={styles.name}>{item.name}</h4>
                <p style={styles.price}>₹ {item.price}</p>
              </div>
              <button style={styles.addBtn} onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {toastMsg && <div style={styles.toast}>{toastMsg}</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '0 5px',
  },
  name: {
    fontSize: '17px',
    margin: 0,
    fontWeight: 600,
    color: '#222',
  },
  price: {
    fontSize: '16px',
    color: '#28a745',
    fontWeight: 'bold',
    margin: 0,
  },
  addBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
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
    zIndex: 1000,
  },
};

export default Home;
