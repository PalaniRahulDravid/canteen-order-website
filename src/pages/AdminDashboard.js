import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('menu');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    localStorage.setItem('menu', JSON.stringify(menu));
  }, [menu]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      image: form.image || 'https://source.unsplash.com/200x150/?food'
    };
    setMenu([...menu, newItem]);
    setForm({ name: '', price: '', image: '' });
  };

  const deleteItem = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽️ Admin Dashboard</h2>

      <form onSubmit={addItem} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          required
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add Item</button>
      </form>

      <h3 style={styles.subheading}>📋 Current Menu</h3>
      {menu.length === 0 ? (
        <p style={styles.noItems}>No items added yet.</p>
      ) : (
        <div style={styles.grid}>
          {menu.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
              <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1000px',
    margin: 'auto',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#333',
  },
  subheading: {
    marginTop: '40px',
    marginBottom: '20px',
    color: '#444',
  },
  form: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1 1 200px',
  },
  addButton: {
    padding: '10px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '130px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  noItems: {
    color: '#777',
    fontStyle: 'italic',
  }
};

export default AdminDashboard;
