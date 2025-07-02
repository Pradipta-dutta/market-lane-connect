
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  orderHistory: [{
    type: String,
    ref: 'Order'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
