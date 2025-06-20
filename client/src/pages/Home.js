import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [showLock, setShowLock] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) setMenu(JSON.parse(storedMenu));

    // Show lock overlay on scroll if not logged in
    const handleScroll = () => {
      const user = localStorage.getItem('currentUser');
      if (!user) setShowLock(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (item) => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      setShowLock(true);
      return;
    }
    addToCart(item);
    setToastMsg(`${item.name} added to cart ✅`);
    setTimeout(() => setToastMsg(''), 1800);
  };

  const handleLogin = () => {
    setShowLock(false);
    navigate('/login');
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

      {/* Toast Message */}
      {toastMsg && <div className="home-toast">{toastMsg}</div>}

      {/* Locked Overlay */}
      {showLock && (
        <div className="home-lock-overlay">
          <div className="home-lock-modal">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="Locked"
              className="home-lock-img"
            />
            <h3>Please Login First</h3>
            <p className="home-lock-desc">
              You need to be logged in to view and order from the menu.
            </p>
            <button className="home-lock-btn" onClick={handleLogin}>
              Login Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;