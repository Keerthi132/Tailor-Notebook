// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Query the 'users' table to find a user by username
    const userQuery = await pool.query(
      `SELECT id, username, password, role FROM users WHERE username = $1`,
      [username]
    );
    if (userQuery.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = userQuery.rows[0];

    // Compare the provided password with the stored hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });

    // Send back the user information (id, username, role)
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Hash the password before storing it in the database
    const hashed = await bcrypt.hash(password, 10);

    // Insert the new user into the 'users' table with the provided role
    await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashed, role]);

    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Server error during registration' });
  }
});

module.exports = router;
