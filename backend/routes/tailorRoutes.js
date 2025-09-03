// backend/routes/tailorRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Get all orders (for tailor)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id as order_id, c.username as customer_name, d.name as design_name, o.status, o.placed_at
       FROM orders o
       JOIN users c ON o.customer_id = c.id
       JOIN designs d ON o.design_id = d.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
});

// Update order status to 'completed'
router.put('/:order_id/status', async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, req.params.order_id]);
    res.json({ message: 'Order status updated to completed' });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
