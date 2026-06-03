const express = require('express');
const multer = require('multer');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

// Configure Multer for memory-based storage (stateless file handling)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit to 5MB PDF uploads
  },
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are supported. Please upload a valid PDF document.'));
    }
  }
});

// Candidate Route: Upload and analyze resume
router.post('/resume/analyze', upload.single('resume'), resumeController.analyzeResume);

// Recruiter Route: Upload resume and match against JD
router.post('/recruiter/match', upload.single('resume'), resumeController.matchResume);

// Global router error handler for Multer limits or filters
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  } else if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

module.exports = router;
