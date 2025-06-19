import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

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
    <div className="admin-container">
      <h2 className="admin-heading">🍽️ Admin Dashboard</h2>

      <form onSubmit={addItem} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          required
          value={form.name}
          onChange={handleChange}
          className="admin-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          value={form.price}
          onChange={handleChange}
          className="admin-input"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="admin-input"
        />
        <button type="submit" className="admin-add-btn">Add Item</button>
      </form>

      <h3 className="admin-subheading">📋 Current Menu</h3>
      {menu.length === 0 ? (
        <p className="admin-no-items">No items added yet.</p>
      ) : (
        <div className="admin-grid">
          {menu.map((item) => (
            <div key={item.id} className="admin-card">
              <img src={item.image} alt={item.name} className="admin-image" />
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
              <button onClick={() => deleteItem(item.id)} className="admin-delete-btn">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;