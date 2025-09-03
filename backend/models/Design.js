// backend/models/Design.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Design = sequelize.define('Design', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Design;
