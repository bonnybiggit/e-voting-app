const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  positionId: { type: String, required: true },
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  manifesto: { type: String },
  photoUrl: { type: String }
});

module.exports = mongoose.model('Candidate', candidateSchema);
