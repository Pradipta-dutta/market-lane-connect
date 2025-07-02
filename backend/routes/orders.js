
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - Fetch all orders with optional filtering
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.customerId) {
      query.customerId = req.query.customerId;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.startDate && req.query.endDate) {
      query.orderDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    const orders = await Order.find(query).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders/:orderId - Fetch order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Order with this ID already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/orders/:orderId - Update order
router.put('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/orders/:orderId - Delete order
router.delete('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
