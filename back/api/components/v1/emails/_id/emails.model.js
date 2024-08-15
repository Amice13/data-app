const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Email message schema
const emailSchema = new mongoose.Schema({
  email: { type: String },
  status: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
}, { timestamps: true })

// User model
const Email = mongoose.model('email', emailSchema)

// Export the model
module.exports = { Email }
