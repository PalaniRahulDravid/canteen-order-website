const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
  const { userId, items } = req.body;
  // items: [{ item: menuItemId, quantity }]
  let total = 0;
  for (const i of items) {
    const menuItem = await MenuItem.findById(i.item);
    total += menuItem.price * i.quantity;
  }
  const order = new Order({ user: userId, items, total });
  await order.save();
  res.json(order);
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('items.item');
  res.json(orders);
});

module.exports = router;