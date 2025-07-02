
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET /api/customers - Fetch all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/customers/:phoneNumber - Fetch customer by phone number
router.get('/:phoneNumber', async (req, res) => {
  try {
    const customer = await Customer.findOne({ phoneNumber: req.params.phoneNumber });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/customers - Create new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Customer with this phone number already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/customers/:phoneNumber - Update customer
router.put('/:phoneNumber', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber },
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/customers/:phoneNumber - Delete customer
router.delete('/:phoneNumber', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
