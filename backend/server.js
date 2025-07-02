
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// TODO: Add MongoDB URI from .env
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/storemanagement', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Import routes
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const employeeRoutes = require('./routes/employees');
const alertRoutes = require('./routes/alerts');

// Use routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/alerts', alertRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
