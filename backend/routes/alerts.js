
const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET /api/alerts - Fetch all alerts with optional employee filtering
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.employeeId) {
      query.employeeId = req.query.employeeId;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    const alerts = await Alert.find(query).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/alerts/:alertId - Fetch alert by ID
router.get('/:alertId', async (req, res) => {
  try {
    const alert = await Alert.findOne({ alertId: req.params.alertId });
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/alerts - Create new alert
router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Alert with this ID already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/alerts/:alertId - Update alert
router.put('/:alertId', async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { alertId: req.params.alertId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/alerts/:alertId - Delete alert
router.delete('/:alertId', async (req, res) => {
  try {
    const alert = await Alert.findOneAndDelete({ alertId: req.params.alertId });
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
