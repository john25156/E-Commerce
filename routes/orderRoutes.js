const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Use environment variable in production

const router = express.Router();

// Middleware to authenticate user via JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    if (!products || !totalPrice) {
      return res.status(400).json({ message: 'Products and totalPrice are required' });
    }
    const newOrder = new Order({
      user: req.user.userId,
      products,
      totalPrice,
      status: 'Pending'
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get orders for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
