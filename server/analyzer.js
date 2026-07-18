/**
 * Resume Analyzer - Extracts ATS-friendly checklist items from job descriptions
 */

// Common technical skills and keywords to look for
const TECHNICAL_KEYWORDS = {
  'programming_languages': [
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go', 'rust', 
    'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'perl', 'groovy'
  ],
  'web_frameworks': [
    'react', 'vue', 'angular', 'next.js', 'nuxt', 'express', 'django', 'flask',
    'spring', 'rails', 'laravel', 'asp.net', 'fastapi', 'svelte', 'ember'
  ],
  'databases': [
    'sql', 'mysql', 'postgresql', 'mongodb', 'oracle', 'redis', 'cassandra',
    'dynamodb', 'firebase', 'elasticsearch', 'snowflake', 'bigquery', 'mariadb'
  ],
  'tools_platforms': [
    'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'gitlab',
    'github', 'terraform', 'ansible', 'jira', 'linux', 'unix', 'windows'
  ],
  'data_skills': [
    'machine learning', 'data analysis', 'statistics', 'tableau', 'power bi',
    'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'analytics'
  ],
  'soft_skills': [
    'communication', 'leadership', 'teamwork', 'problem solving', 'project management',
    'critical thinking', 'collaboration', 'time management', 'presentation'
  ]
};

// Responsibility keywords to extract
const RESPONSIBILITY_KEYWORDS = [
  'develop', 'build', 'design', 'implement', 'maintain', 'optimize', 'improve',
  'troubleshoot', 'debug', 'deploy', 'manage', 'monitor', 'analyze', 'create',
  'test', 'code', 'collaborate', 'architect', 'refactor', 'support', 'lead'
];

/**
 * Extract keywords from text
 */
function extractKeywords(text, keywords) {
  const lowerText = text.toLowerCase();
  return keywords.filter(keyword => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Extract responsibilities from job description
 */
function extractResponsibilities(text) {
  const lines = text.split('\n');
  const responsibilities = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    // Look for bullet points or numbered items that contain responsibility keywords
    if ((trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) && 
        RESPONSIBILITY_KEYWORDS.some(keyword => trimmed.toLowerCase().includes(keyword))) {
      responsibilities.push(trimmed.replace(/^[-•\d.]\s*/, '').trim());
    }
  });

  return responsibilities.slice(0, 8); // Limit to top 8
}

/**
 * Extract years of experience mentioned in job description
 */
function extractExperienceRequirements(text) {
  const patterns = [
    /(\d+)\+?\s*years?\s+of\s+experience/gi,
    /(\d+)\+?\s*years?\s+(?:experience|experience\s+with)/gi
  ];

  const matches = [];
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push(parseInt(match[1]));
    }
  });

  return {
    minYears: matches.length > 0 ? Math.min(...matches) : null,
    mentioned: matches.length > 0
  };
}

/**
 * Extract required education/certifications
 */
function extractEducationRequirements(text) {
  const lowerText = text.toLowerCase();
  const education = [];

  if (lowerText.includes('bachelor') || lowerText.includes('b.s') || lowerText.includes('bs ')) {
    education.push("Bachelor's Degree");
  }
  if (lowerText.includes('master') || lowerText.includes('m.s') || lowerText.includes('ms ')) {
    education.push("Master's Degree");
  }
  if (lowerText.includes('phd') || lowerText.includes('ph.d')) {
    education.push("PhD");
  }
  if (lowerText.includes('certification') || lowerText.includes('certified')) {
    education.push("Industry Certification(s)");
  }

  return education.length > 0 ? education : ["High School Diploma"];
}

/**
 * Generate ATS-friendly resume checklist from job description
 */
function generateChecklist(jobDescription) {
  const checklist = {
    technical_skills: [],
    experience_level: {},
    education: [],
    responsibilities: [],
    keywords: [],
    ats_tips: []
  };

  // Extract technical skills
  for (const [category, keywords] of Object.entries(TECHNICAL_KEYWORDS)) {
    const found = extractKeywords(jobDescription, keywords);
    if (found.length > 0) {
      checklist.technical_skills.push({
        category: category.replace(/_/g, ' ').toUpperCase(),
        skills: found,
        count: found.length
      });
    }
  }

  // Extract experience requirements
  checklist.experience_level = extractExperienceRequirements(jobDescription);

  // Extract education
  checklist.education = extractEducationRequirements(jobDescription);

  // Extract key responsibilities
  checklist.responsibilities = extractResponsibilities(jobDescription);

  // Collect all ATS keywords (most important for resume matching)
  const allKeywords = new Set();
  for (const keywordList of Object.values(TECHNICAL_KEYWORDS)) {
    extractKeywords(jobDescription, keywordList).forEach(k => allKeywords.add(k));
  }
  checklist.keywords = Array.from(allKeywords).sort();

  // Generate ATS tips based on analysis
  checklist.ats_tips = generateATSTips(jobDescription, checklist);

  return checklist;
}

/**
 * Generate actionable ATS tips
 */
function generateATSTips(jobDescription, checklist) {
  const tips = [];

  // Tip 1: Keywords
  if (checklist.keywords.length > 0) {
    tips.push({
      id: 'keywords',
      priority: 'HIGH',
      title: 'Include Critical Keywords',
      description: `Incorporate these ${checklist.keywords.length} technical keywords throughout your resume: ${checklist.keywords.slice(0, 5).join(', ')}${checklist.keywords.length > 5 ? ` and ${checklist.keywords.length - 5} more` : ''}`,
      action: 'Mirror job description language in your resume'
    });
  }

  // Tip 2: Skills section
  if (checklist.technical_skills.length > 0) {
    tips.push({
      id: 'skills_section',
      priority: 'HIGH',
      title: 'Create Comprehensive Skills Section',
      description: `Add a dedicated skills section with: ${checklist.technical_skills.map(s => s.category).join(', ')}`,
      action: 'List skills in order of relevance to the job'
    });
  }

  // Tip 3: Experience
  if (checklist.responsibilities.length > 0) {
    tips.push({
      id: 'responsibilities',
      priority: 'HIGH',
      title: 'Highlight Relevant Responsibilities',
      description: `Use action verbs matching job description: ${RESPONSIBILITY_KEYWORDS.slice(0, 5).join(', ')}...`,
      action: 'Rewrite bullet points to match job responsibilities'
    });
  }

  // Tip 4: Experience level
  if (checklist.experience_level.mentioned) {
    const years = checklist.experience_level.minYears;
    tips.push({
      id: 'experience_level',
      priority: 'MEDIUM',
      title: 'Match Experience Level',
      description: `Job requires minimum ${years} years of experience. Ensure your work history clearly demonstrates this.`,
      action: 'Quantify your years of experience and impact'
    });
  }

  // Tip 5: Education
  if (checklist.education.length > 0) {
    tips.push({
      id: 'education',
      priority: 'MEDIUM',
      title: 'Include Education Section',
      description: `Required/Preferred education: ${checklist.education.join(', ')}`,
      action: 'Add education section with degree and university'
    });
  }

  // Tip 6: Format tips
  tips.push({
    id: 'formatting',
    priority: 'MEDIUM',
    title: 'Optimize Resume Format for ATS',
    description: 'Use standard fonts, clear section headers, and bullet points. Avoid tables, graphics, and unusual formatting.',
    action: 'Use simple formatting: PDF or DOCX, standard fonts like Arial or Calibri'
  });

  // Tip 7: Quantifiable results
  tips.push({
    id: 'metrics',
    priority: 'MEDIUM',
    title: 'Add Quantifiable Achievements',
    description: 'Include metrics and percentages showing your impact: "increased efficiency by 30%", "managed team of 5", etc.',
    action: 'Replace vague statements with specific numbers and results'
  });

  return tips;
}

module.exports = {
  generateChecklist,
  extractKeywords,
  extractResponsibilities,
  extractExperienceRequirements,
  extractEducationRequirements
};
