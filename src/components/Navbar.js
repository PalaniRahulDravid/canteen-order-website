// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart, FaSignInAlt, FaClipboardList, FaHome } from 'react-icons/fa';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>
        <FaUtensils style={styles.icon} />
        CampusEats
      </h2>
      <ul style={styles.links}>
        <li>
          <Link to="/" style={styles.link}>
            <FaHome style={styles.iconSmall} /> Home
          </Link>
        </li>
        <li>
          <Link to="/cart" style={styles.link}>
            <FaShoppingCart style={styles.iconSmall} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/orders" style={styles.link}>
            <FaClipboardList style={styles.iconSmall} /> Orders
          </Link>
        </li>
        <li>
          <Link to="/login" style={styles.link}>
            <FaSignInAlt style={styles.iconSmall} /> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#fff',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: '#2874f0',
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '24px',
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    padding: '6px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },
  iconSmall: {
    fontSize: '16px',
  },
};

export default Navbar;
