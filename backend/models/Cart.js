// backend/models/Cart.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // Assuming you have a db.js that initializes Sequelize.

const Cart = sequelize.define('Cart', {
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  design_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
