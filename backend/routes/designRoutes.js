const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Get all designs or filter by category (male, female, kids)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    // Base query
    let query = 'SELECT * FROM designs';
    let queryParams = [];

    // Apply filter only if category is present
    if (category) {
      query += ' WHERE category = $1';
      queryParams.push(category);
    }

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching designs:', err);
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});


module.exports = router;
