import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaClipboardList, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const checkboxRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();

  // Close toggle on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        const checkbox = checkboxRef.current;
        if (checkbox && checkbox.checked) {
          checkbox.checked = false;
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close toggle on route change
  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={containerRef}>
        <Link to="/" className="navbar-logo">Campus Eats</Link>

        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" ref={checkboxRef} />
        <label htmlFor="navbar-toggle" className="navbar-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div className="navbar-links">
          <Link to="/"><FaHome style={{ marginRight: 6 }} />Home</Link>
          <Link to="/cart"><FaShoppingCart style={{ marginRight: 6 }} />Cart</Link>
          <Link to="/orders"><FaClipboardList style={{ marginRight: 6 }} />Orders</Link>
          <Link to="/login"><FaSignInAlt style={{ marginRight: 6 }} />Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;