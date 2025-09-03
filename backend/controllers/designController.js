// backend/controllers/designController.js
const Design = require('../models/Design');

exports.getDesigns = async (req, res) => {
  try {
    const designs = await Design.findAll();
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
};
