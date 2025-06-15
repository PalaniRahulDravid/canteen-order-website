import React, { useState } from 'react';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login Successful!\nEmail: ${form.email}`);
    // In real app: validate credentials
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default Login;
