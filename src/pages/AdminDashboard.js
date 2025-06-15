import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  // Load from localStorage
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('menu');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: ''
  });

  // Save to localStorage whenever menu changes
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
      <h2>Admin Dashboard</h2>

      <form onSubmit={addItem} style={styles.form}>
        <input type="text" name="name" placeholder="Food Name" required value={form.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" required value={form.price} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>

      <h3>Current Menu</h3>
      {menu.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div style={styles.grid}>
          {menu.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
              <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
