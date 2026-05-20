const express = require('express');
const router = express.Router();
const Voter = require('../models/Voter');

// Register a new voter
router.post('/register', async (req, res) => {
  try {
    const { fullName, department, matricNumber, pin } = req.body;

    // Validation
    if (!fullName || !department || !matricNumber || !pin) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!matricNumber.startsWith('ACE/')) {
      return res.status(400).json({ error: 'Invalid matric number format. Use ACE/...' });
    }

    // Check if voter already exists
    const existingVoter = await Voter.findOne({ matricNumber });
    if (existingVoter) {
      return res.status(400).json({ error: 'Student is already registered' });
    }

    // Create new voter
    const newVoter = new Voter({
      fullName,
      department,
      matricNumber,
      pin // Stored as plain text for demonstration
    });

    await newVoter.save();

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login voter
router.post('/login', async (req, res) => {
  try {
    const { matricNumber, pin } = req.body;

    if (!matricNumber || !pin) {
      return res.status(400).json({ error: 'Matric number and PIN are required' });
    }

    // Find voter
    const voter = await Voter.findOne({ matricNumber });
    if (!voter) {
      return res.status(401).json({ error: 'Student not registered. Please register first.' });
    }

    // Verify PIN
    if (voter.pin !== pin) {
      return res.status(401).json({ error: 'Incorrect PIN' });
    }

    // Check if already voted
    if (voter.status === 'VOTED') {
      return res.status(403).json({ error: 'You have already cast your vote.' });
    }

    res.json({ success: true, voter: { 
      id: voter._id, 
      fullName: voter.fullName, 
      department: voter.department, 
      matricNumber: voter.matricNumber,
      status: voter.status 
    }});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
