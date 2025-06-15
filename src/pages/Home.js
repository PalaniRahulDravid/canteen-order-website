import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Home() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext); // ✅ Access addToCart

  useEffect(() => {
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    }
  }, []);

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
              <button
                style={styles.addBtn}
                onClick={() => addToCart(item)} // ✅ Add to cart
              >
                Add to Cart
              </button>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
};

export default Home;
