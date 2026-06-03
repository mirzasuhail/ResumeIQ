const pdf = require('pdf-parse');

/**
 * Parses raw PDF buffer and extracts plain text.
 * @param {Buffer} fileBuffer 
 * @returns {Promise<string>} Plain text content of the PDF
 */
async function parsePdf(fileBuffer) {
  try {
    const data = await pdf(fileBuffer);
    return data.text || '';
  } catch (error) {
    console.error('Error parsing PDF in parserService:', error);
    throw new Error('Failed to parse PDF file');
  }
}

module.exports = {
  parsePdf
};
