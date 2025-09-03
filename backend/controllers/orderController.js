// backend/controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Design = require('../models/Design'); // Assuming you have a Design model.

exports.placeOrder = async (req, res) => {
  try {
    const { customer_id, designs } = req.body;

    // Create the order
    const newOrder = await Order.create({ customer_id });

    // Add designs to the order (could be done using an association if you prefer)
    await Promise.all(designs.map(async (design_id) => {
      await Cart.destroy({ where: { customer_id, design_id } }); // Remove from cart after ordering
    }));

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const orders = await Order.findAll({ where: { customer_id } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
