// server.js
//
// Entry point for the Express app.
// Lightweight, readable, and intentionally verbose for learning/debugging.

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();


// --- Global middleware

app.use(helmet());
app.use(cors({
  origin: config.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Parse JSON bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (so resumes can be downloaded/viewed in dev).
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Routes

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/jobs', jobRoutes);

app.use('/api/v1/applications', applicationRoutes);


// --- Error handler (centralized)
app.use(errorHandler);


// --- Start server

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log('');
  console.log(`  JobSeeker backend running → http://localhost:${PORT}`);
  console.log('');
});
