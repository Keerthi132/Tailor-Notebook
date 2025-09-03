// backend/models/Order.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // Assuming you have a db.js that initializes Sequelize.

const Order = sequelize.define('Order', {
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // Default status is "pending"
  },
});

module.exports = Order;
