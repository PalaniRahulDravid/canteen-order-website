import React, { useState } from 'react';

function Register() {
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
    alert(`Registered Successfully!\nName: ${form.name}`);
    // In real app: Save to backend / Firebase / Local Storage
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} />
        <button type="submit">Register</button>
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

export default Register;
