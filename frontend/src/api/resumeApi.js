import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000 // 30s timeout
});

/**
 * Uploads a resume PDF and performs candidate career & ATS analysis.
 * @param {File} file 
 * @returns {Promise<object>} Analysis response
 */
export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/resume/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

/**
 * Uploads a resume and job description to compare match fit.
 * @param {File} file 
 * @param {string} jobDescription 
 * @returns {Promise<object>} Recruiter match response
 */
export const matchJobDescription = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  const response = await api.post('/recruiter/match', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  analyzeResume,
  matchJobDescription
};
