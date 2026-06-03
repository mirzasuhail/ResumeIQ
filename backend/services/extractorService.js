const SKILLS_LIST = [
  // Languages
  { key: 'javascript', regex: /\b(javascript|js)\b/i, display: 'JavaScript', category: 'Languages' },
  { key: 'typescript', regex: /\b(typescript|ts)\b/i, display: 'TypeScript', category: 'Languages' },
  { key: 'python', regex: /\bpython\b/i, display: 'Python', category: 'Languages' },
  { key: 'java', regex: /\bjava\b/i, display: 'Java', category: 'Languages' },
  { key: 'c++', regex: /\bc\+\+|cpp\b/i, display: 'C++', category: 'Languages' },
  { key: 'c#', regex: /\bc#|csharp\b/i, display: 'C#', category: 'Languages' },
  { key: 'c', regex: /\bC\b/, display: 'C', category: 'Languages' },
  { key: 'go', regex: /\b(Go|Golang)\b/, display: 'Go', category: 'Languages' },
  { key: 'rust', regex: /\brust\b/i, display: 'Rust', category: 'Languages' },
  { key: 'ruby', regex: /\bruby\b/i, display: 'Ruby', category: 'Languages' },
  { key: 'php', regex: /\bphp\b/i, display: 'PHP', category: 'Languages' },
  { key: 'swift', regex: /\bswift\b/i, display: 'Swift', category: 'Languages' },
  { key: 'kotlin', regex: /\bkotlin\b/i, display: 'Kotlin', category: 'Languages' },
  { key: 'scala', regex: /\bscala\b/i, display: 'Scala', category: 'Languages' },
  { key: 'r', regex: /\bR\b/, display: 'R', category: 'Languages' },

  // Frontend
  { key: 'html', regex: /\bhtml5?\b/i, display: 'HTML5', category: 'Frontend' },
  { key: 'css', regex: /\bcss3?\b/i, display: 'CSS3', category: 'Frontend' },
  { key: 'react', regex: /\breact(\.js|js)?\b/i, display: 'React', category: 'Frontend' },
  { key: 'vue', regex: /\bvue(\.js|js)?\b/i, display: 'Vue.js', category: 'Frontend' },
  { key: 'angular', regex: /\bangular(\.js|js)?\b/i, display: 'Angular', category: 'Frontend' },
  { key: 'svelte', regex: /\bsvelte\b/i, display: 'Svelte', category: 'Frontend' },
  { key: 'next.js', regex: /\bnext(\.js|js)?\b/i, display: 'Next.js', category: 'Frontend' },
  { key: 'nuxt.js', regex: /\bnuxt(\.js|js)?\b/i, display: 'Nuxt.js', category: 'Frontend' },
  { key: 'tailwind', regex: /\btailwind(css)?\b/i, display: 'Tailwind CSS', category: 'Frontend' },
  { key: 'bootstrap', regex: /\bbootstrap\b/i, display: 'Bootstrap', category: 'Frontend' },
  { key: 'sass', regex: /\bsass|scss\b/i, display: 'Sass', category: 'Frontend' },
  { key: 'redux', regex: /\bredux\b/i, display: 'Redux', category: 'Frontend' },
  { key: 'zustand', regex: /\bzustand\b/i, display: 'Zustand', category: 'Frontend' },
  { key: 'framer-motion', regex: /\bframer\s+motion\b/i, display: 'Framer Motion', category: 'Frontend' },
  { key: 'vite', regex: /\bvite\b/i, display: 'Vite', category: 'Frontend' },

  // Backend
  { key: 'node.js', regex: /\bnode(\.js|js)?\b/i, display: 'Node.js', category: 'Backend' },
  { key: 'express', regex: /\bexpress(\.js|js)?\b/i, display: 'Express.js', category: 'Backend' },
  { key: 'django', regex: /\bdjango\b/i, display: 'Django', category: 'Backend' },
  { key: 'flask', regex: /\bflask\b/i, display: 'Flask', category: 'Backend' },
  { key: 'fastapi', regex: /\bfastapi\b/i, display: 'FastAPI', category: 'Backend' },
  { key: 'rails', regex: /\b(rails|ruby on rails)\b/i, display: 'Ruby on Rails', category: 'Backend' },
  { key: 'spring-boot', regex: /\bspring(\s+boot)?\b/i, display: 'Spring Boot', category: 'Backend' },
  { key: 'nestjs', regex: /\bnest(\.js|js)?\b/i, display: 'NestJS', category: 'Backend' },
  { key: 'graphql', regex: /\bgraphql\b/i, display: 'GraphQL', category: 'Backend' },
  { key: 'rest-api', regex: /\b(rest\s+api|restful\s+api|rest)\b/i, display: 'REST API', category: 'Backend' },

  // Databases
  { key: 'mongodb', regex: /\b(mongodb|mongo)\b/i, display: 'MongoDB', category: 'Databases' },
  { key: 'postgresql', regex: /\b(postgresql|postgres)\b/i, display: 'PostgreSQL', category: 'Databases' },
  { key: 'mysql', regex: /\bmysql\b/i, display: 'MySQL', category: 'Databases' },
  { key: 'sqlite', regex: /\bsqlite\b/i, display: 'SQLite', category: 'Databases' },
  { key: 'redis', regex: /\bredis\b/i, display: 'Redis', category: 'Databases' },
  { key: 'dynamodb', regex: /\bdynamodb\b/i, display: 'DynamoDB', category: 'Databases' },
  { key: 'elasticsearch', regex: /\belasticsearch\b/i, display: 'Elasticsearch', category: 'Databases' },
  { key: 'sql', regex: /\bsql\b/i, display: 'SQL', category: 'Databases' },
  { key: 'nosql', regex: /\bnosql\b/i, display: 'NoSQL', category: 'Databases' },
  { key: 'prisma', regex: /\bprisma\b/i, display: 'Prisma', category: 'Databases' },

  // Cloud & DevOps
  { key: 'git', regex: /\bgit\b/i, display: 'Git', category: 'DevOps & Tools' },
  { key: 'github', regex: /\bgithub\b/i, display: 'GitHub', category: 'DevOps & Tools' },
  { key: 'docker', regex: /\bdocker\b/i, display: 'Docker', category: 'DevOps & Tools' },
  { key: 'kubernetes', regex: /\b(kubernetes|k8s)\b/i, display: 'Kubernetes', category: 'DevOps & Tools' },
  { key: 'aws', regex: /\b(aws|amazon web services)\b/i, display: 'AWS', category: 'DevOps & Tools' },
  { key: 'gcp', regex: /\b(gcp|google cloud|google cloud platform)\b/i, display: 'GCP', category: 'DevOps & Tools' },
  { key: 'azure', regex: /\b(azure|microsoft azure)\b/i, display: 'Azure', category: 'DevOps & Tools' },
  { key: 'ci-cd', regex: /\b(ci\/cd|cicd)\b/i, display: 'CI/CD', category: 'DevOps & Tools' },
  { key: 'jenkins', regex: /\bjenkins\b/i, display: 'Jenkins', category: 'DevOps & Tools' },
  { key: 'terraform', regex: /\bterraform\b/i, display: 'Terraform', category: 'DevOps & Tools' },
  { key: 'vercel', regex: /\bvercel\b/i, display: 'Vercel', category: 'DevOps & Tools' },
  { key: 'firebase', regex: /\bfirebase\b/i, display: 'Firebase', category: 'DevOps & Tools' },
  { key: 'supabase', regex: /\bsupabase\b/i, display: 'Supabase', category: 'DevOps & Tools' },

  // Data Science, AI & ML
  { key: 'scikit-learn', regex: /\b(scikit-learn|scikitlearn|sklearn)\b/i, display: 'Scikit-Learn', category: 'Data & AI/ML' },
  { key: 'tensorflow', regex: /\b(tensorflow|tf)\b/i, display: 'TensorFlow', category: 'Data & AI/ML' },
  { key: 'keras', regex: /\bkeras\b/i, display: 'Keras', category: 'Data & AI/ML' },
  { key: 'pytorch', regex: /\bpytorch\b/i, display: 'PyTorch', category: 'Data & AI/ML' },
  { key: 'pandas', regex: /\bpandas\b/i, display: 'Pandas', category: 'Data & AI/ML' },
  { key: 'numpy', regex: /\bnumpy\b/i, display: 'NumPy', category: 'Data & AI/ML' },
  { key: 'spark', regex: /\b(spark|apache spark)\b/i, display: 'Apache Spark', category: 'Data & AI/ML' },
  { key: 'hadoop', regex: /\bhadoop\b/i, display: 'Hadoop', category: 'Data & AI/ML' },
  { key: 'jupyter', regex: /\bjupyter\b/i, display: 'Jupyter', category: 'Data & AI/ML' },
  { key: 'machine-learning', regex: /\b(machine learning|ml)\b/i, display: 'Machine Learning', category: 'Data & AI/ML' },
  { key: 'deep-learning', regex: /\b(deep learning)\b/i, display: 'Deep Learning', category: 'Data & AI/ML' },
  { key: 'nlp', regex: /\b(nlp|natural language processing)\b/i, display: 'NLP', category: 'Data & AI/ML' },
  { key: 'computer-vision', regex: /\b(computer vision|cv)\b/i, display: 'Computer Vision', category: 'Data & AI/ML' },
  { key: 'ai', regex: /\b(ai|artificial intelligence)\b/i, display: 'AI', category: 'Data & AI/ML' },
  { key: 'data-science', regex: /\bdata science\b/i, display: 'Data Science', category: 'Data & AI/ML' },
  { key: 'tableau', regex: /\btableau\b/i, display: 'Tableau', category: 'Data & AI/ML' },
  { key: 'powerbi', regex: /\b(powerbi|power bi)\b/i, display: 'Power BI', category: 'Data & AI/ML' },

  // Management & Soft Skills
  { key: 'agile', regex: /\bagile\b/i, display: 'Agile', category: 'Management & Soft Skills' },
  { key: 'scrum', regex: /\bscrum\b/i, display: 'Scrum', category: 'Management & Soft Skills' },
  { key: 'project-management', regex: /\bproject management\b/i, display: 'Project Management', category: 'Management & Soft Skills' },
  { key: 'communication', regex: /\bcommunication\b/i, display: 'Communication', category: 'Management & Soft Skills' },
  { key: 'leadership', regex: /\bleadership\b/i, display: 'Leadership', category: 'Management & Soft Skills' },
  { key: 'teamwork', regex: /\b(teamwork|collaboration)\b/i, display: 'Teamwork', category: 'Management & Soft Skills' },
  { key: 'problem-solving', regex: /\bproblem solving\b/i, display: 'Problem Solving', category: 'Management & Soft Skills' }
];

const SECTIONS = {
  experience: /\b(experience|work history|employment|career history|professional background|work experience|employment history)\b/i,
  education: /\b(education|academic history|academic background|qualification|degrees|academic credential)\b/i,
  projects: /\b(projects|personal projects|key projects|academic projects|portfolio projects)\b/i,
  skills: /\b(skills|technical skills|key skills|competencies|areas of expertise|technologies|technical expertise)\b/i
};

function extractName(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return 'Candidate';

  // Candidate name is usually in the first 5 lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];

    // Ignore links, emails, and phone numbers
    if (line.includes('@') || line.match(/\d{5,}/) || line.toLowerCase().includes('github.com') || line.toLowerCase().includes('linkedin.com')) {
      continue;
    }

    // Ignore standard header names or roles
    const lower = line.toLowerCase();
    if (['resume', 'curriculum vitae', 'cv', 'summary', 'profile', 'contact', 'about me', 'experience', 'education', 'skills', 'projects', 'portfolio'].includes(lower)) {
      continue;
    }

    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      // Check if words start with a capital letter or are entirely capital letters
      const isLikelyName = words.every(w => /^[A-Z][a-zA-Z\-]*$/.test(w) || /^[A-Z]+$/.test(w));
      if (isLikelyName) {
        return line;
      }
    }
  }

  // Fallback: Use first short line
  if (lines[0] && lines[0].length < 35 && !lines[0].includes('@') && !lines[0].match(/\d{5,}/)) {
    return lines[0];
  }

  return 'John Doe'; // Default fallback
}

function extractEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : '';
}

function extractPhone(text) {
  // Matches formats: +1-234-567-8901, (123) 456-7890, 123-456-7890, +91 9876543210, etc.
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,5}/g;
  const matches = text.match(phoneRegex);
  return matches ? matches[0] : '';
}

function extractLinks(text) {
  const links = [];
  
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_\-]+/gi;
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-]+/gi;
  
  const githubMatches = text.match(githubRegex);
  const linkedinMatches = text.match(linkedinRegex);
  
  if (githubMatches) {
    links.push({ type: 'github', url: githubMatches[0] });
  }
  if (linkedinMatches) {
    links.push({ type: 'linkedin', url: linkedinMatches[0] });
  }

  // Generic portfolio URL match (excluding github/linkedin)
  const genericUrlRegex = /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}(?:\/[^\s]*)?\b/gi;
  const genericMatches = text.match(genericUrlRegex);
  if (genericMatches) {
    for (const match of genericMatches) {
      const lower = match.toLowerCase();
      if (!lower.includes('github.com') && 
          !lower.includes('linkedin.com') && 
          !lower.includes('email') && 
          !lower.includes('@') && 
          !lower.includes('pdf-parse') &&
          !lower.match(/\.(pdf|doc|docx|png|jpg)$/)) {
        links.push({ type: 'portfolio', url: match });
        break; // Stop at first non-github, non-linkedin portfolio link
      }
    }
  }

  return links;
}

function extractSkills(text) {
  const skills = [];
  const lowercaseText = text.toLowerCase();

  for (const item of SKILLS_LIST) {
    // If case sensitive, search original text, else search lowercaseText
    const match = item.regex.test(lowercaseText) || (item.regex.flags.indexOf('i') === -1 && item.regex.test(text));
    if (match) {
      skills.push({
        name: item.display,
        category: item.category
      });
    }
  }

  return skills;
}

function detectSections(text) {
  const sectionsFound = [];
  for (const [sectionKey, regex] of Object.entries(SECTIONS)) {
    if (regex.test(text)) {
      sectionsFound.push(sectionKey);
    }
  }
  return sectionsFound;
}

/**
 * Main function to extract all candidate information
 * @param {string} text 
 * @returns {object} Structured candidate information
 */
function extractCandidateInfo(text) {
  const name = extractName(text);
  const email = extractEmail(text);
  const phone = extractPhone(text);
  const links = extractLinks(text);
  const skills = extractSkills(text);
  const sectionsFound = detectSections(text);

  return {
    name,
    email,
    phone,
    links,
    skills,
    sectionsFound
  };
}

module.exports = {
  extractCandidateInfo,
  SKILLS_LIST
};
