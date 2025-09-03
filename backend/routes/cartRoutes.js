const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Add item to cart
router.post('/', async (req, res) => {
  const { customer_id, design_id } = req.body;
  try {
    await pool.query('INSERT INTO cart (customer_id, design_id) VALUES ($1, $2)', [customer_id, design_id]);
    res.json({ message: 'Item added to cart' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Get cart items for a customer (with design details)
router.get('/:customer_id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id as cart_id, d.*, c.added_at FROM cart c
       JOIN designs d ON c.design_id = d.id
       WHERE c.customer_id = $1`,
      [req.params.customer_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Delete item from cart by cart ID
router.delete('/:cart_id', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart WHERE id = $1', [req.params.cart_id]);
    res.json({ message: 'Item removed from cart' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

// Place order: Move cart items to orders and clear cart
router.post('/place-order/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const cartItems = await client.query(
      'SELECT design_id FROM cart WHERE customer_id = $1',
      [customer_id]
    );

    for (const item of cartItems.rows) {
      await client.query(
        `INSERT INTO orders (customer_id, design_id, status, placed_at)
         VALUES ($1, $2, 'pending', NOW())`,
        [customer_id, item.design_id]
      );
    }

    await client.query('DELETE FROM cart WHERE customer_id = $1', [customer_id]);

    await client.query('COMMIT');
    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    client.release();
  }
});

module.exports = router;
