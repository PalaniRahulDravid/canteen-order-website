import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const OWNER_EMAIL = 'rahuldravidpalani2005@gmail.com'; // <-- Set your owner email here

function AdminDashboard() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [toast, setToast] = useState('');
  const [notAuth, setNotAuth] = useState(false);

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user.email || user.email !== OWNER_EMAIL) {
      setNotAuth(true);
    }
  }, []);

  // Fetch menu from backend
  const fetchMenu = async () => {
    const res = await fetch('http://localhost:5000/api/menu');
    const data = await res.json();
    // Sort alphabetically by name
    setMenu(data.sort((a, b) => a.name.localeCompare(b.name)));
  };

  useEffect(() => {
    if (!notAuth) fetchMenu();
    // eslint-disable-next-line
  }, [notAuth]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add menu item (send JWT)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      setToast('Please fill all fields.');
      return;
    }
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    });
    if (res.ok) {
      setToast('Item added!');
      setForm({ name: '', price: '', image: '' });
      fetchMenu();
    } else {
      const data = await res.json();
      setToast(data.msg || 'Failed to add item.');
    }
  };

  // Delete menu item (send JWT)
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      setToast('Item deleted!');
      fetchMenu();
    } else {
      const data = await res.json();
      setToast(data.msg || 'Failed to delete item.');
    }
  };

  if (notAuth) {
    return (
      <div className="admin-container">
        <h2>Admin Dashboard</h2>
        <div style={{ color: '#e53e3e', fontWeight: 600, fontSize: '1.2rem', marginTop: 40 }}>
          ❌ Not authorized. Only the owner can access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Dashboard</h2>
      <form className="admin-form" onSubmit={handleAdd}>
        <input
          className="admin-input"
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="admin-input"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="admin-input"
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <button className="admin-add-btn" type="submit">Add Item</button>
      </form>
      <div className="admin-grid">
        {menu.length === 0 ? (
          <p className="admin-no-items">No menu items found.</p>
        ) : (
          menu.map(item => (
            <div className="admin-card" key={item._id}>
              <img className="admin-image" src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p style={{ fontWeight: 600, color: '#b7791f', fontSize: '1.1rem' }}>₹{item.price}</p>
              <button className="admin-delete-btn" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}

export default AdminDashboard;