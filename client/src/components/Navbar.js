import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaClipboardList, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Campus Eats
        </Link>
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="navbar-links">
          <Link to="/"><FaHome style={{marginRight: 6}} />Home</Link>
          <Link to="/cart"><FaShoppingCart style={{marginRight: 6}} />Cart</Link>
          <Link to="/orders"><FaClipboardList style={{marginRight: 6}} />Orders</Link>
          <Link to="/login"><FaSignInAlt style={{marginRight: 6}} />Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;