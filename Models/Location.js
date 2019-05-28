const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  building: {
    type: Number,
    required: false
  },
  floor: {
    type: Number,
    required: false
  },
  otype: {
    type: String,
    required: false
  },
  number: {
    type: Number,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);