const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend application integration
app.use(cors({
  origin: '*', // For portfolio project, allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Setup JSON and Form-data request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup base status check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ResumeIQ API Service is running smoothly.' });
});

// Register Resume intelligence endpoints
app.use('/api', resumeRoutes);

// Global Error Handler fallback
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error: ' + err.message });
});

// Bind server port
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(` ResumeIQ Backend running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(`========================================`);
});
