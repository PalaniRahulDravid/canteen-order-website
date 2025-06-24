const express = require('express');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// Add a menu item (admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.email !== 'rahuldravidpalani2005@gmail.com') {
    return res.status(403).json({ msg: 'Only owner can add items' });
  }
  const { name, price, image } = req.body;
  const item = new MenuItem({ name, price, image });
  await item.save();
  res.json(item);
});

// Delete a menu item (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.email !== 'rahuldravidpalani2005@gmail.com') {
    return res.status(403).json({ msg: 'Only owner can delete items' });
  }
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;