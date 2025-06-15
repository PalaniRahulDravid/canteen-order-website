import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In future: validate + store in backend or Firebase
    localStorage.setItem('user', JSON.stringify(form));
    alert(`Welcome ${form.name}! Registration successful.`);
    navigate('/login');
  };

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        {/* Left side - Branding */}
        <div style={styles.left}>
          <h1 style={{ marginBottom: '10px' }}>New here?</h1>
          <p>Sign up to explore the canteen services and order food with ease!</p>
        </div>

        {/* Right side - Form */}
        <form style={styles.right} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Register</button>
          <p style={styles.footerText}>
            Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    height: '100vh',
    backgroundColor: '#f1f3f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '60%',
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 2px 12px rgba(0,0,0,0.15)',
    backgroundColor: '#fff',
  },
  left: {
    flex: 1,
    backgroundColor: '#2874f0',
    color: '#fff',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '24px',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#fb641b',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#2874f0',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Register;
