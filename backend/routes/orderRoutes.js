// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Place order
router.post('/', async (req, res) => {
  const { customer_id, design_ids } = req.body;
  try {
    for (const design_id of design_ids) {
      await pool.query(
        'INSERT INTO orders (customer_id, design_id, status) VALUES ($1, $2, $3)',
        [customer_id, design_id, 'pending']
      );
    }
    await pool.query('DELETE FROM cart WHERE customer_id = $1', [customer_id]);
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get orders for a customer
// backend/routes/orderRoutes.js
router.get('/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;

    // Fetch pending orders
    const pendingOrdersResult = await pool.query(
      `SELECT o.id as order_id, d.*, o.status, o.placed_at
       FROM orders o
       JOIN designs d ON o.design_id = d.id
       WHERE o.customer_id = $1 AND o.status = 'pending'`,
      [customer_id]
    );

    // Fetch completed orders
    const completedOrdersResult = await pool.query(
      `SELECT o.id as order_id, d.*, o.status, o.placed_at
       FROM orders o
       JOIN designs d ON o.design_id = d.id
       WHERE o.customer_id = $1 AND o.status = 'completed'`,
      [customer_id]
    );

    res.json({
      pendingOrders: pendingOrdersResult.rows,
      completedOrders: completedOrdersResult.rows
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// // Tailor: Get all orders
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT o.id as order_id, c.username as customer_name, d.*, o.status
//        FROM orders o
//        JOIN  c ON o.customer_id = c.id
//        JOIN designs d ON o.design_id = d.id`
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Failed to fetch all orders:', err);
//     res.status(500).json({ error: 'Failed to fetch all orders' });
//   }
// });

// // Tailor: Update order status
// router.put('/:order_id/status', async (req, res) => {
//   const { status } = req.body;
//   try {
//     await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, req.params.order_id]);
//     res.json({ message: 'Order status updated' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update status' });
//   }
// });

module.exports = router;