const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: Number
    }
  ],
  total: Number,
  status: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);