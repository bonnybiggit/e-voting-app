const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  status: { type: String, enum: ['ELIGIBLE', 'VOTED'], default: 'ELIGIBLE' }
}, { timestamps: true });

module.exports = mongoose.model('Voter', voterSchema);
