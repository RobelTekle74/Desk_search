const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');

// Location Model
const Location = require('../../Models/Location');

// @route   GET api/locations
// @desc    Get All locations
// @access  Public
router.get('/', (req, res) => {
  Location.find()
    .sort({ date: -1 })
    .then(locations => res.json(locations));
});

// @route   POST api/Locations
// @desc    Create A Location
// @access  Private
router.post('/', (req, res) => {
  const newLocation = new Location({
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    building: req.body.building,
    floor: req.body.floor,
    otype: req.body.otype,
    number: req.body.number
  });

  newLocation.save().then(locations => res.json(locations));
});

// @route   DELETE api/Locations/:id
// @desc    Delete A Location
// @access  Private
router.delete('/:id', (req, res) => {
  Location.findById(req.params.id)
    .then(location => location.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;