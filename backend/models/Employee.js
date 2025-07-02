
const mongoose = require('mongoose');

const employeeAlertSchema = new mongoose.Schema({
  alertId: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'read', 'completed'],
    default: 'pending'
  }
});

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  alerts: [employeeAlertSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
