const express = require('express');
const router = express.Router();
const Voter = require('../models/Voter');

router.post('/submit', async (req, res) => {
  try {
    const { matricNumber, votes } = req.body;
    
    if (!matricNumber || !votes) {
      return res.status(400).json({ error: 'Missing voting data' });
    }

    // Check voter status
    const voter = await Voter.findOne({ matricNumber });
    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    if (voter.status === 'VOTED') {
      return res.status(403).json({ error: 'You have already voted' });
    }

    // Mark as voted
    voter.status = 'VOTED';
    await voter.save();

    res.json({ success: true, ballotId: Math.random().toString(36).substr(2, 9) });
  } catch (error) {
    console.error('Voting error:', error);
    res.status(500).json({ error: 'Server error during ballot submission' });
  }
});

module.exports = router;
