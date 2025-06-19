import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Home.css';

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
    setTimeout(() => setToastMsg(''), 2000);
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to CanteenApp</h1>
        <p>
          Order your favorite meals quickly and easily. Enjoy a seamless canteen experience from your mobile or laptop!
        </p>
      </div>
      <h2 className="home-title">Canteen Menu</h2>
      {menu.length === 0 ? (
        <p className="no-items">No items available. Please check later!</p>
      ) : (
        <div className="home-grid">
          {menu.map((item) => (
            <div key={item.id} className="home-card">
              <img src={item.image} alt={item.name} className="home-image" />
              <div className="home-info-row">
                <h4 className="home-name">{item.name}</h4>
                <p className="home-price">₹ {item.price}</p>
              </div>
              <button className="home-add-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      {toastMsg && <div className="home-toast">{toastMsg}</div>}
    </div>
  );
}

export default Home;