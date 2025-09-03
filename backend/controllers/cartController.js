// backend/controllers/cartController.js
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { customer_id, design_id } = req.body;
    const newCartItem = await Cart.create({ customer_id, design_id });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const cartItems = await Cart.findAll({ where: { customer_id } });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};
