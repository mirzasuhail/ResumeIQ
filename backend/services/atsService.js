/**
 * Evaluates candidate data and raw text to compute an ATS score & breakdown.
 * @param {object} candidate Candidate info extracted by extractorService
 * @param {string} text Raw text of the resume
 * @returns {object} ATS analysis containing score, strengths, weaknesses, and missing items
 */
function analyzeAts(candidate, text) {
  let score = 0;
  const strengths = [];
  const weaknesses = [];
  const missing = [];

  // 1. Contact Info Scoring (Max 15 points)
  let contactScore = 0;
  if (candidate.email) {
    contactScore += 5;
  } else {
    missing.push('Email Address');
  }

  if (candidate.phone) {
    contactScore += 5;
  } else {
    missing.push('Phone Number');
  }

  const hasLinkedIn = candidate.links.some(l => l.type === 'linkedin');
  const hasGitHub = candidate.links.some(l => l.type === 'github');

  if (candidate.links.length > 0) {
    contactScore += 5;
    if (hasLinkedIn && hasGitHub) {
      strengths.push('Complete professional footprint: both LinkedIn and GitHub profiles linked.');
    } else if (hasLinkedIn) {
      strengths.push('LinkedIn professional profile is linked.');
      weaknesses.push('Consider adding a GitHub link to showcase project source codes.');
    } else if (hasGitHub) {
      strengths.push('GitHub profile is linked.');
      weaknesses.push('Consider adding a LinkedIn profile to build professional network connections.');
    }
  } else {
    weaknesses.push('No professional links (LinkedIn, GitHub, or Portfolio) were found.');
    missing.push('Professional Links');
  }
  score += contactScore;

  // 2. Skills Scoring (Max 25 points)
  let skillsScore = 0;
  const skillCount = candidate.skills.length;
  
  if (candidate.sectionsFound.includes('skills')) {
    skillsScore += 10;
  } else {
    weaknesses.push('Resume lacks an explicit "Skills" or "Technologies" section heading.');
    missing.push('Skills Section Header');
  }

  // Score based on skills count
  if (skillCount >= 8) {
    skillsScore += 15;
    strengths.push(`Rich skill profile with ${skillCount} relevant technologies and tools detected.`);
  } else if (skillCount >= 4) {
    skillsScore += 10;
    strengths.push(`Diverse core skills detected (${skillCount} skills).`);
    weaknesses.push('Consider expanding the skills section to include more related tools, libraries, or methodologies.');
  } else if (skillCount > 0) {
    skillsScore += 5;
    weaknesses.push('Very few technical skills extracted. Highlight specific tools and programming languages.');
  } else {
    weaknesses.push('No industry-standard technical skills were detected. Add specific languages, frameworks, or tools.');
    missing.push('Technical Skills List');
  }
  score += skillsScore;

  // 3. Work Experience Scoring (Max 25 points)
  let experienceScore = 0;
  const hasExperienceSection = candidate.sectionsFound.includes('experience');

  if (hasExperienceSection) {
    experienceScore += 15;
    // Heuristic checking length of experience details
    const expRegex = /(?:experience|work history|employment)[\s\S]{100,}/i;
    const isDetailed = expRegex.test(text);
    if (isDetailed) {
      experienceScore += 10;
      strengths.push('Work experience section is detailed and well-documented.');
    } else {
      experienceScore += 5;
      weaknesses.push('Work experience descriptions seem brief. Expand on accomplishments, impact, and project details.');
    }
  } else {
    weaknesses.push('No distinct "Work Experience" section was identified. This is crucial for ATS parsing.');
    missing.push('Work Experience Section');
  }
  score += experienceScore;

  // 4. Education Scoring (Max 15 points)
  let educationScore = 0;
  const hasEducationSection = candidate.sectionsFound.includes('education');

  if (hasEducationSection) {
    educationScore += 10;
    const eduKeywords = /\b(bachelor|master|degree|university|college|b\.s|b\.tech|m\.s|m\.tech|graduate)\b/i;
    if (eduKeywords.test(text)) {
      educationScore += 5;
      strengths.push('Education credentials and degrees are clearly stated.');
    } else {
      weaknesses.push('Degree levels (e.g. Bachelor, Master) are not clearly defined in the education section.');
    }
  } else {
    weaknesses.push('No "Education" section was found.');
    missing.push('Education Section');
  }
  score += educationScore;

  // 5. Projects & Links (Max 20 points)
  let projectsScore = 0;
  const hasProjectsSection = candidate.sectionsFound.includes('projects');

  if (hasProjectsSection) {
    projectsScore += 12;
    // Check details in projects
    const projRegex = /(?:projects|portfolio)[\s\S]{80,}/i;
    if (projRegex.test(text)) {
      projectsScore += 8;
      strengths.push('Includes a structured personal/academic projects section.');
    } else {
      projectsScore += 4;
      weaknesses.push('Project descriptions are too short. Describe the tech stack, goal, and your contribution for each project.');
    }
  } else {
    // If no projects section, see if they have experiences or other proof
    weaknesses.push('Add a dedicated "Projects" section to demonstrate practical implementation skills.');
    missing.push('Projects Section');
  }
  score += projectsScore;

  // Normalize final score to a maximum of 100
  score = Math.min(100, Math.max(0, score));

  // Default fallback strengths if none added
  if (strengths.length === 0) {
    strengths.push('Basic document structure parsed successfully.');
  }

  return {
    score,
    strengths,
    weaknesses,
    missing
  };
}

module.exports = {
  analyzeAts
};
