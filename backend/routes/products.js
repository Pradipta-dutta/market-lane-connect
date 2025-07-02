
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Fetch all products with optional name search
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' };
    }
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' };
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:productId - Fetch product by ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Create new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Product with this ID already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// PUT /api/products/:productId - Update product
router.put('/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/products/:productId - Delete product
router.delete('/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
