const ROLE_TEMPLATES = {
  'AI Engineer': {
    coreSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Machine Learning', 'AI', 'NLP'],
    additionalSkills: ['Git', 'GitHub', 'SQL', 'FastAPI', 'Pandas'],
    description: 'Designs and deploys artificial intelligence systems, neural networks, and integrates Large Language Models (LLMs).'
  },
  'ML Engineer': {
    coreSkills: ['Python', 'Scikit-Learn', 'TensorFlow', 'Keras', 'PyTorch', 'Machine Learning'],
    additionalSkills: ['NumPy', 'Pandas', 'Jupyter', 'Git', 'SQL'],
    description: 'Builds, trains, and scales machine learning pipelines and production predictive analytics systems.'
  },
  'Data Analyst': {
    coreSkills: ['SQL', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Data Analytics'],
    additionalSkills: ['Python', 'R', 'Excel', 'Jupyter', 'Git'],
    description: 'Cleans, transforms, and analyzes complex datasets to deliver business intelligence and visual reporting dashboards.'
  },
  'Backend Developer': {
    coreSkills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST API', 'SQL'],
    additionalSkills: ['Python', 'Django', 'FastAPI', 'Docker', 'Git', 'Redis', 'GraphQL'],
    description: 'Engineers application server-side architecture, develops APIs, configures databases, and ensures scalability.'
  },
  'Frontend Developer': {
    coreSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    additionalSkills: ['TypeScript', 'Vue.js', 'Angular', 'Redux', 'Sass', 'Vite', 'Framer Motion'],
    description: 'Builds responsive, high-performance, and visually engaging user interfaces and web applications.'
  },
  'Full Stack Developer': {
    coreSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'SQL'],
    additionalSkills: ['TypeScript', 'Git', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST API'],
    description: 'Handles full lifecycle development, bridging frontend responsiveness with robust backend architectures and databases.'
  },
  'Web Developer': {
    coreSkills: ['HTML5', 'CSS3', 'JavaScript'],
    additionalSkills: ['Bootstrap', 'Tailwind CSS', 'Vite', 'Git'],
    description: 'Creates and deploys standard responsive websites using core web standards and modern CSS frameworks.'
  }
};

/**
 * Matches candidate skills against roles and determines explicit eligibility fit
 * @param {array} candidateSkills Array of skill objects { name, category }
 * @param {number} atsScore Current ATS score of the resume
 * @returns {object} Suggestions list and matching roles
 */
function analyzeCareer(candidateSkills, atsScore) {
  const candidateSkillNames = candidateSkills.map(s => s.name.toLowerCase());
  const suggestions = [];
  const rolesMatch = [];

  // 1. Core Role Comparison Matching
  for (const [roleName, template] of Object.entries(ROLE_TEMPLATES)) {
    const coreMatches = template.coreSkills.filter(skill =>
      candidateSkillNames.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
    );
    const additionalMatches = template.additionalSkills.filter(skill =>
      candidateSkillNames.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
    );

    const coreWeight = 0.7;
    const addWeight = 0.3;

    const coreRatio = coreMatches.length / template.coreSkills.length;
    const addRatio = template.additionalSkills.length > 0 ? (additionalMatches.length / template.additionalSkills.length) : 0;

    let score = Math.round((coreRatio * coreWeight + addRatio * addWeight) * 100);

    // Apply minor penalty if candidate has almost no skills
    if (candidateSkills.length === 0) {
      score = 0;
    }

    rolesMatch.push({
      role: roleName,
      matchPercentage: score,
      matchingSkills: [...coreMatches, ...additionalMatches],
      missingSkills: template.coreSkills.filter(s => !coreMatches.includes(s)),
      description: template.description
    });
  }

  // Sort roles by highest match percentage first
  rolesMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // 2. Custom Heuristic Eligibility Advisor (Suggested by User)
  
  // Rule A: Web Developer fundamentals
  const webFundamentals = ['html5', 'css3', 'javascript'];
  const hasWebFundamentals = webFundamentals.every(skill => 
    candidateSkillNames.some(cs => {
      const lowerCs = cs.toLowerCase();
      // Match js/javascript, css/css3, html/html5
      if (skill === 'javascript' && (lowerCs === 'js' || lowerCs === 'javascript')) return true;
      if (skill === 'css3' && (lowerCs === 'css' || lowerCs === 'css3')) return true;
      if (skill === 'html5' && (lowerCs === 'html' || lowerCs === 'html5')) return true;
      return lowerCs.includes(skill);
    })
  );
  if (hasWebFundamentals) {
    suggestions.push({
      role: 'Web Developer',
      reason: 'You have strong foundational skills in core web standards (HTML, CSS, JavaScript). You are highly eligible for Web Developer roles.',
      level: 'Highly Eligible'
    });
  }

  // Rule B: Machine Learning Engineer fundamentals
  const mlFundamentals = ['python', 'scikit-learn', 'tensorflow', 'keras', 'pytorch'];
  const matchedMl = mlFundamentals.filter(skill =>
    candidateSkillNames.some(cs => {
      const lowerCs = cs.toLowerCase();
      if (skill === 'scikit-learn' && (lowerCs === 'sklearn' || lowerCs === 'scikitlearn' || lowerCs === 'scikit-learn')) return true;
      if (skill === 'tensorflow' && (lowerCs === 'tf' || lowerCs === 'tensorflow')) return true;
      return lowerCs.includes(skill);
    })
  );
  if (matchedMl.length >= 3) {
    suggestions.push({
      role: 'ML Engineer',
      reason: `You possess strong machine learning fundamentals, demonstrating key tools: ${matchedMl.map(m => m.toUpperCase()).join(', ')}.`,
      level: 'Highly Eligible'
    });
  }

  // Rule C: AI Engineer (Python + TensorFlow/PyTorch/AI/Deep Learning/NLP)
  const aiFundamentals = ['python', 'tensorflow', 'pytorch', 'deep-learning', 'machine-learning', 'ai', 'nlp'];
  const matchedAi = aiFundamentals.filter(skill =>
    candidateSkillNames.some(cs => cs.includes(skill) || cs.toLowerCase().includes(skill.replace('-', ' ')))
  );
  if (matchedAi.length >= 4 && candidateSkillNames.some(cs => cs.includes('python'))) {
    suggestions.push({
      role: 'AI Engineer',
      reason: 'You show advanced capabilities in deep learning, neural networks, and Python-based modeling.',
      level: 'Highly Eligible'
    });
  }

  // Rule D: Full Stack Developer (React + Node/Express + Mongo/SQL)
  const hasFrontend = candidateSkillNames.some(cs => ['react', 'vue', 'angular', 'svelte', 'html5'].includes(cs));
  const hasBackend = candidateSkillNames.some(cs => ['node.js', 'express', 'django', 'flask', 'fastapi', 'spring'].includes(cs));
  const hasDb = candidateSkillNames.some(cs => ['mongodb', 'postgresql', 'mysql', 'sql', 'redis'].includes(cs));
  if (hasFrontend && hasBackend && hasDb) {
    suggestions.push({
      role: 'Full Stack Developer',
      reason: 'You show versatility across the entire stack, possessing frontend UI, backend server logic, and database management skills.',
      level: 'Eligible'
    });
  }

  // Warning check for low ATS score
  if (atsScore < 55) {
    suggestions.push({
      role: 'ATS Quality Check Needed',
      reason: 'Your overall ATS score is low. Standardizing formatting and listing specific contact channels will make your eligibility profile much stronger.',
      level: 'Critical Action Needed'
    });
  }

  // If no positive eligibility matched, suggest general developer path
  if (suggestions.length === 0 && candidateSkills.length > 0) {
    suggestions.push({
      role: 'Software Developer (General)',
      reason: 'You have basic engineering skills. Expand on specific frontend, backend, or ML libraries to match specialized roles.',
      level: 'Developing'
    });
  }

  return {
    rolesMatch,
    eligibilitySuggestions: suggestions
  };
}

module.exports = {
  analyzeCareer
};
