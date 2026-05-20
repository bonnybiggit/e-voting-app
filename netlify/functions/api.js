const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('../../server/routes/auth');
const voteRoutes = require('../../server/routes/vote');
const adminRoutes = require('../../server/routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

// Load environment variable or use the hardcoded Atlas URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://shanegrubbs46_db_user:Poladtech*2020@ac-alo2luj-shard-00-00.o7dcv9m.mongodb.net:27017,ac-alo2luj-shard-00-01.o7dcv9m.mongodb.net:27017,ac-alo2luj-shard-00-02.o7dcv9m.mongodb.net:27017/evoting?ssl=true&replicaSet=atlas-eszz8s-shard-0&authSource=admin&appName=AcePolingUnit1';

// Serverless DB connection logic
let conn = null;
const connectDB = async () => {
  if (conn) return;
  conn = mongoose.connect(MONGODB_URI);
  await conn;
};

// Ensure DB is connected before hitting routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB Connection Error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);

// Export for Netlify Functions
module.exports.handler = serverless(app);
