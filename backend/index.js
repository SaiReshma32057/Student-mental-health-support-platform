const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // so we can read JSON in req.body

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Journal Routes  <<--- Add these lines
const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journal', journalRoutes);
const recordRoutes = require("./routes/recordRoutes");
app.use("/api/records", recordRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
