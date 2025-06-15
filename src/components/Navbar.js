// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>CampusEats</h2>
      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/cart" style={styles.link}>Cart</Link></li>
        <li><Link to="/orders" style={styles.link}>Orders</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/register" style={styles.link}>Register</Link></li>
        <li><Link to="/admin" style={styles.link}>Admin</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    margin: 0,
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
