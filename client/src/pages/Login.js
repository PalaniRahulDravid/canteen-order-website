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

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find((user) => user.email === form.email);

    if (!matchedUser) {
      setToastMsg('❌ User not found. Please register.');
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    if (matchedUser.password !== form.password) {
      setToastMsg('❌ Incorrect password.');
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    setToastMsg(`✅ Welcome back, ${matchedUser.name || matchedUser.email.split('@')[0]} 👋`);

    setTimeout(() => {
      setToastMsg('');
      navigate('/');
    }, 2000);
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