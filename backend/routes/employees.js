
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET /api/employees - Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/employees/:employeeId - Fetch employee by ID
router.get('/:employeeId', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/employees - Create new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Employee with this ID already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/employees/:employeeId - Update employee
router.put('/:employeeId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/employees/:employeeId - Delete employee
router.delete('/:employeeId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
