const { SKILLS_LIST } = require('./extractorService');

/**
 * Extracts skills from Job Description text.
 * @param {string} jdText 
 * @returns {array} Array of skills found in JD
 */
function extractSkillsFromJD(jdText) {
  if (!jdText) return [];
  const lowercaseJd = jdText.toLowerCase();
  const jdSkills = [];

  for (const item of SKILLS_LIST) {
    const match = item.regex.test(lowercaseJd);
    if (match) {
      jdSkills.push(item.display);
    }
  }
  return jdSkills;
}

/**
 * Matches candidate resume skills against job description requirements
 * @param {array} candidateSkills Array of candidate skills (objects or strings)
 * @param {string} jdText Raw Job Description text
 * @returns {object} Recruiter matching results
 */
function matchResumeToJd(candidateSkills, jdText) {
  // Normalize candidate skill names to lowercase strings
  const resumeSkillNames = candidateSkills.map(s => 
    typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase()
  );

  // Extract skills from Job Description
  const jdSkills = extractSkillsFromJD(jdText);
  const lowercaseJdSkills = jdSkills.map(s => s.toLowerCase());

  if (jdSkills.length === 0) {
    // Fallback: If no skills detected in JD, try to evaluate based on general text similarity or defaults
    return {
      matchScore: 65,
      matchingSkills: [],
      missingSkills: [],
      recommendation: 'Potential Match (Unable to extract specific tech stack from JD. Please provide a more detailed job description.)'
    };
  }

  // Calculate matching and missing skills
  const matchingSkills = [];
  const missingSkills = [];

  for (let i = 0; i < jdSkills.length; i++) {
    const jdSkillDisplay = jdSkills[i];
    const jdSkillLower = lowercaseJdSkills[i];

    // Check if candidate has this skill
    const hasSkill = resumeSkillNames.some(rs => 
      rs === jdSkillLower || rs.includes(jdSkillLower) || jdSkillLower.includes(rs)
    );

    if (hasSkill) {
      matchingSkills.push(jdSkillDisplay);
    } else {
      missingSkills.push(jdSkillDisplay);
    }
  }

  // Calculate Match Score percentage
  const matchScore = Math.round((matchingSkills.length / jdSkills.length) * 100);

  // Determine Recommendation verdict
  let recommendation = '';
  if (matchScore >= 80) {
    recommendation = 'Strong Match — The candidate possesses the vast majority of the required tech stack and is highly recommended for an interview.';
  } else if (matchScore >= 50) {
    recommendation = 'Potential Fit — The candidate possesses the core foundational skills but is missing several supplementary technologies. Recommended for screening.';
  } else {
    recommendation = 'Lacks Core Skills — The candidate does not meet the minimum technical requirements for this position. Upskilling or alternative candidates required.';
  }

  return {
    matchScore,
    matchingSkills,
    missingSkills,
    recommendation
  };
}

module.exports = {
  matchResumeToJd
};
