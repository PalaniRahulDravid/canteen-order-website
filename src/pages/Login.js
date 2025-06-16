import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [toastMsg, setToastMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login check (you can replace this with real auth)
    if (form.email && form.password) {
      setToastMsg(`Welcome back, ${form.email.split('@')[0]} 👋`);

      // Show message and then redirect after delay
      setTimeout(() => {
        setToastMsg('');
        navigate('/'); // ✅ Redirect to home page
      }, 2000);
    } else {
      setToastMsg('Invalid credentials! ❌');
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        {/* Left Section */}
        <div style={styles.left}>
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="login"
            style={styles.image}
          />
        </div>

        {/* Right Section */}
        <div style={styles.right}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
            <p style={styles.text}>
              New to our site?{' '}
              <span style={styles.link} onClick={() => navigate('/register')}>
                Create an account
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && <div style={styles.toast}>{toastMsg}</div>}
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#f1f3f6',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontFamily: 'sans-serif',
  },
  box: {
    width: '750px',
    height: '500px',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  left: {
    backgroundColor: '#2874f0',
    color: '#fff',
    width: '40%',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    marginTop: '20px',
    width: '100%',
    borderRadius: '6px',
  },
  right: {
    width: '60%',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#fb641b',
    color: '#fff',
    padding: '12px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  text: {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
    color: '#555',
  },
  link: {
    color: '#2874f0',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#323232',
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.2)',
    animation: 'slideIn 0.4s ease-out',
    zIndex: 1000,
  },
};

export default Login;
