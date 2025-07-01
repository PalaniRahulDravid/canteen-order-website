import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Scanner from './pages/Scanner';
import Payment from './pages/Payment'; // <-- Add this line
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/payment" element={<Payment />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;