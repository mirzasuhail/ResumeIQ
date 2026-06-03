const parserService = require('../services/parserService');
const extractorService = require('../services/extractorService');
const atsService = require('../services/atsService');
const careerService = require('../services/careerService');
const matchService = require('../services/matchService');

/**
 * Controller to handle resume upload & analysis for candidates.
 */
async function analyzeResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume PDF file uploaded.' });
    }

    // 1. Parse PDF to plain text
    const rawText = await parserService.parsePdf(req.file.buffer);
    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'Unable to extract text from the PDF. Ensure the file is not empty or scanned/encrypted.' });
    }

    // 2. Extract structured candidate information
    const candidateInfo = extractorService.extractCandidateInfo(rawText);

    // 3. Compute ATS breakdown and scoring
    const atsAnalysis = atsService.analyzeAts(candidateInfo, rawText);

    // 4. Perform career-fit analysis and eligibility diagnostic suggestions
    const careerAnalysis = careerService.analyzeCareer(candidateInfo.skills, atsAnalysis.score);

    // 5. Send back structured response
    return res.status(200).json({
      candidate: {
        name: candidateInfo.name,
        email: candidateInfo.email,
        phone: candidateInfo.phone,
        links: candidateInfo.links,
        skills: candidateInfo.skills
      },
      ats: atsAnalysis,
      career: careerAnalysis
    });

  } catch (error) {
    console.error('Error in analyzeResume controller:', error);
    return res.status(500).json({ error: 'An error occurred during resume analysis: ' + error.message });
  }
}

/**
 * Controller to match resume against Job Description for recruiters.
 */
async function matchResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume PDF file uploaded.' });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Job description content is required for matching.' });
    }

    // 1. Parse PDF to plain text
    const rawText = await parserService.parsePdf(req.file.buffer);
    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'Unable to extract text from the PDF.' });
    }

    // 2. Extract candidate skills
    const candidateInfo = extractorService.extractCandidateInfo(rawText);

    // 3. Run matching engine
    const matchResults = matchService.matchResumeToJd(candidateInfo.skills, jobDescription);

    return res.status(200).json(matchResults);

  } catch (error) {
    console.error('Error in matchResume controller:', error);
    return res.status(500).json({ error: 'An error occurred during job matching: ' + error.message });
  }
}

module.exports = {
  analyzeResume,
  matchResume
};
