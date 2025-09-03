const express = require('express');
const app = express();
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const designRoutes = require('./routes/designRoutes');
const tailorRoutes = require('./routes/tailorRoutes');

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// Use Routes
app.use('/api', authRoutes);              // /api/login, /api/register
app.use('/api/cart', cartRoutes);         // /api/cart/:id, POST /api/cart
app.use('/api/orders', orderRoutes);      // /api/orders/:id, etc.
app.use('/api/designs', designRoutes);    // /api/designs
app.use('/api/tailor', tailorRoutes);

// Start server
app.listen(5000, () => {
  console.log('✅ Backend server is running at http://localhost:5000');
});
