import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [toast, setToast] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast('');
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setToast(`✅ Welcome ${form.name}! Registration successful.`);
        setTimeout(() => {
          setToast('');
          navigate('/login');
        }, 1500);
      } else {
        setToast('⚠️ ' + (data.msg || 'Registration failed.'));
      }
    } catch (err) {
      setToast('❌ Server error. Try again.');
    }
  };

  return (
    <div className="register-outer">
      <div className="register-card">
        {/* Left side - Branding */}
        <div className="register-left">
          <h1>New here?</h1>
          <p>Sign up to explore the canteen services and order food with ease!</p>
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
            alt="register"
            className="register-image"
          />
        </div>

        {/* Right side - Form */}
        <form className="register-right" onSubmit={handleSubmit}>
          <h2 className="register-heading">Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={form.name}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
          <p className="register-footerText">
            Already have an account? <Link to="/login" className="register-link">Login here</Link>
          </p>
        </form>
      </div>

      {/* Toast Message */}
      {toast && <div className="register-toast">{toast}</div>}
    </div>
  );
}

export default Register;