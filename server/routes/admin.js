const express = require('express');
const router = express.Router();
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');

// Get all voters
router.get('/voters', async (req, res) => {
  try {
    const voters = await Voter.find().select('-pin'); // Don't send pins to frontend
    res.json(voters);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching voters' });
  }
});

// Get all candidates
router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates.map(c => ({
      id: c._id,
      positionId: c.positionId,
      fullName: c.fullName,
      department: c.department,
      manifesto: c.manifesto,
      photoUrl: c.photoUrl
    })));
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching candidates' });
  }
});

// Create candidate
router.post('/candidates', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Error creating candidate' });
  }
});

// Update candidate
router.put('/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Error updating candidate' });
  }
});

// Delete candidate
router.delete('/candidates/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting candidate' });
  }
});

module.exports = router;
