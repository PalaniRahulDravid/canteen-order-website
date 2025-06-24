import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [toastMsg, setToastMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setToastMsg(`✅ Welcome back, ${data.user.name || data.user.email.split('@')[0]} 👋`);
        setTimeout(() => {
          setToastMsg('');
          navigate('/');
        }, 1500);
      } else {
        setToastMsg('❌ ' + (data.msg || 'Login failed.'));
      }
    } catch (err) {
      setToastMsg('❌ Server error. Try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* Left Section */}
        <div className="login-left">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="login"
            className="login-image"
          />
        </div>

        {/* Right Section */}
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={form.email}
              onChange={handleChange}
              className="login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={form.password}
              onChange={handleChange}
              className="login-input"
            />
            <button type="submit" className="login-button">Login</button>
            <p className="login-text">
              New to our site?{' '}
              <span className="login-link" onClick={() => navigate('/register')}>
                Create an account
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && <div className="login-toast">{toastMsg}</div>}
    </div>
  );
}

export default Login;