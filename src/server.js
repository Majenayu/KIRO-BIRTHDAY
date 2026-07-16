/**
 * TeamFlow AI Workspace - Backend Server
 * 
 * Main Express server that handles:
 * - API endpoints for workspace management
 * - Static file serving
 * - Project data storage and retrieval
 * - AI teammate response generation
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data storage paths
const dataDir = path.join(__dirname, 'data');
const projectsFile = path.join(dataDir, 'projects.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize projects file if it doesn't exist
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify([], null, 2));
}

/**
 * Helper function to read projects from storage
 */
function readProjects() {
  try {
    const data = fs.readFileSync(projectsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

/**
 * Helper function to save projects to storage
 */
function saveProjects(projects) {
  try {
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
}

/**
 * Generate AI teammate response with complete PRD structure
 */
function generateAIResponse(projectName, projectDescription, problemStatement, goals) {
  // Simulate AI analysis and generation
  const response = {
    projectSummary: `${projectName} is designed to ${projectDescription}. This solution addresses the critical problem of ${problemStatement}.`,
    
    objectives: [
      'Deliver comprehensive project documentation',
      'Create actionable implementation plan',
      'Enable seamless collaboration between teams',
      'Reduce project planning time by 70%'
    ],
    
    targetUsers: [
      'Product Managers',
      'Development Teams',
      'Project Stakeholders',
      'Team Leads'
    ],
    
    functionalRequirements: [
      'Multi-panel workspace with human and AI perspectives',
      'Real-time collaborative editing',
      'Automated PRD generation',
      'Task checklist creation and tracking',
      'Export capabilities (Markdown, PDF)',
      'Conversation timeline with history',
      'AI teammate personality and responses'
    ],
    
    nonFunctionalRequirements: [
      'Response time < 100ms for UI interactions',
      'Support for concurrent users',
      'Data persistence with JSON storage',
      'Responsive design (mobile, tablet, desktop)',
      'Dark mode support',
      'Accessibility compliance (WCAG 2.1 AA)'
    ],
    
    userStories: [
      {
        id: 'US-001',
        title: 'User invites AI teammate',
        description: 'As a user, I want to invite an AI teammate so that I get intelligent suggestions for my project',
        acceptanceCriteria: [
          'AI teammate appears in workspace',
          'AI generates complete PRD structure',
          'User can review and edit generated content'
        ]
      },
      {
        id: 'US-002',
        title: 'User exports PRD',
        description: 'As a user, I want to export the PRD as Markdown so that I can share it with stakeholders',
        acceptanceCriteria: [
          'Export button is visible',
          'Markdown file downloads correctly',
          'All sections are included in export'
        ]
      },
      {
        id: 'US-003',
        title: 'User tracks implementation tasks',
        description: 'As a user, I want to see a task checklist so that I can track implementation progress',
        acceptanceCriteria: [
          'Task list is displayed',
          'Tasks can be marked as complete',
          'Progress is persisted'
        ]
      }
    ],
    
    epics: [
      {
        id: 'EPIC-001',
        title: 'Collaboration Framework',
        description: 'Foundation for human-AI collaboration',
        stories: ['US-001', 'US-002', 'US-003']
      },
      {
        id: 'EPIC-002',
        title: 'Document Generation',
        description: 'Automated PRD and task generation',
        stories: ['US-002', 'US-003']
      }
    ],
    
    implementationTasks: [
      {
        id: 'TASK-001',
        title: 'Set up Express server',
        description: 'Initialize Node.js backend with Express',
        priority: 'High',
        estimate: '2h',
        completed: false
      },
      {
        id: 'TASK-002',
        title: 'Create frontend components',
        description: 'Build modular JavaScript components for UI',
        priority: 'High',
        estimate: '4h',
        completed: false
      },
      {
        id: 'TASK-003',
        title: 'Implement data persistence',
        description: 'Set up JSON storage for projects',
        priority: 'Medium',
        estimate: '2h',
        completed: false
      },
      {
        id: 'TASK-004',
        title: 'Build export functionality',
        description: 'Create Markdown export feature',
        priority: 'Medium',
        estimate: '3h',
        completed: false
      },
      {
        id: 'TASK-005',
        title: 'Polish UI/UX',
        description: 'Responsive design and dark mode',
        priority: 'Low',
        estimate: '3h',
        completed: false
      }
    ],
    
    sprintPlan: {
      sprint1: {
        title: 'MVP Foundation',
        duration: '1 week',
        tasks: ['TASK-001', 'TASK-002', 'TASK-003']
      },
      sprint2: {
        title: 'Features & Polish',
        duration: '1 week',
        tasks: ['TASK-004', 'TASK-005']
      }
    },
    
    risks: [
      {
        id: 'RISK-001',
        description: 'AI response generation quality',
        severity: 'Medium',
        mitigation: 'Implement feedback loop and refinement prompts'
      },
      {
        id: 'RISK-002',
        description: 'Data persistence scalability',
        severity: 'Low',
        mitigation: 'Plan migration to database if needed'
      },
      {
        id: 'RISK-003',
        description: 'User adoption of AI teammate',
        severity: 'Medium',
        mitigation: 'Create clear UX patterns and onboarding'
      }
    ],
    
    successMetrics: [
      'Users complete PRD in < 30 minutes',
      ' 90%+ user satisfaction rating',
      'All critical requirements implemented',
      'Zero critical bugs at launch',
      'Response time < 200ms average'
    ],
    
    deploymentChecklist: [
      'All unit tests passing',
      'Code review completed',
      'Security audit passed',
      'Performance benchmarks met',
      'Documentation complete',
      'Staging deployment successful',
      'Production deployment',
      'Monitor error rates'
    ],
    
    futureImprovements: [
      'Integration with real AI language models (GPT, Claude)',
      'WebSocket support for real-time collaboration',
      'Database migration (PostgreSQL/MongoDB)',
      'User authentication and project sharing',
      'Advanced analytics and metrics',
      'Mobile native apps',
      'Plugin ecosystem for extensions'
    ]
  };
  
  return response;
}

// ============================================
// API ENDPOINTS
// ============================================

/**
 * GET / - Serve landing page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * POST /api/projects - Create new project
 */
app.post('/api/projects', (req, res) => {
  const { projectName, projectDescription, problemStatement, goals } = req.body;
  
  if (!projectName) {
    return res.status(400).json({ error: 'Project name is required' });
  }
  
  const projects = readProjects();
  const newProject = {
    id: Date.now().toString(),
    projectName,
    projectDescription,
    problemStatement,
    goals,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aiResponse: null,
    conversation: []
  };
  
  projects.push(newProject);
  saveProjects(projects);
  
  res.status(201).json(newProject);
});

/**
 * GET /api/projects - Get all projects
 */
app.get('/api/projects', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

/**
 * GET /api/projects/:id - Get specific project
 */
app.get('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.json(project);
});

/**
 * POST /api/projects/:id/ai-response - Generate AI teammate response
 */
app.post('/api/projects/:id/ai-response', (req, res) => {
  const projects = readProjects();
  const projectIndex = projects.findIndex(p => p.id === req.params.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  const project = projects[projectIndex];
  const aiResponse = generateAIResponse(
    project.projectName,
    project.projectDescription,
    project.problemStatement,
    project.goals
  );
  
  project.aiResponse = aiResponse;
  project.updatedAt = new Date().toISOString();
  
  projects[projectIndex] = project;
  saveProjects(projects);
  
  res.json({ success: true, aiResponse });
});

/**
 * POST /api/projects/:id/export - Export project as Markdown
 */
app.post('/api/projects/:id/export', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  if (!project.aiResponse) {
    return res.status(400).json({ error: 'AI response not generated yet' });
  }
  
  // Generate Markdown content
  const ai = project.aiResponse;
  let markdown = `# ${project.projectName}\n\n`;
  markdown += `**Description:** ${project.projectDescription}\n\n`;
  markdown += `**Problem Statement:** ${project.problemStatement}\n\n`;
  markdown += `**Goals:** ${project.goals}\n\n`;
  markdown += `**Generated:** ${new Date().toISOString()}\n\n`;
  
  markdown += `## Executive Summary\n${ai.projectSummary}\n\n`;
  markdown += `## Objectives\n${ai.objectives.map(o => `- ${o}`).join('\n')}\n\n`;
  markdown += `## Target Users\n${ai.targetUsers.map(u => `- ${u}`).join('\n')}\n\n`;
  markdown += `## Functional Requirements\n${ai.functionalRequirements.map(r => `- ${r}`).join('\n')}\n\n`;
  markdown += `## Non-Functional Requirements\n${ai.nonFunctionalRequirements.map(r => `- ${r}`).join('\n')}\n\n`;
  
  markdown += `## User Stories\n`;
  ai.userStories.forEach(story => {
    markdown += `### ${story.id}: ${story.title}\n`;
    markdown += `${story.description}\n\n`;
    markdown += `**Acceptance Criteria:**\n${story.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}\n\n`;
  });
  
  markdown += `## Implementation Tasks\n`;
  ai.implementationTasks.forEach(task => {
    markdown += `- [${task.completed ? 'x' : ' '}] ${task.id}: ${task.title} (${task.priority}, Est: ${task.estimate})\n`;
  });
  
  markdown += `\n## Success Metrics\n${ai.successMetrics.map(m => `- ${m}`).join('\n')}\n\n`;
  markdown += `## Future Improvements\n${ai.futureImprovements.map(i => `- ${i}`).join('\n')}\n`;
  
  res.json({ 
    success: true, 
    markdown,
    filename: `${project.projectName.replace(/\s+/g, '-').toLowerCase()}-prd.md`
  });
});

/**
 * POST /api/projects/:id/message - Add message to conversation
 */
app.post('/api/projects/:id/message', (req, res) => {
  const projects = readProjects();
  const projectIndex = projects.findIndex(p => p.id === req.params.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  const { speaker, message } = req.body;
  
  if (!speaker || !message) {
    return res.status(400).json({ error: 'Speaker and message are required' });
  }
  
  const project = projects[projectIndex];
  project.conversation.push({
    id: Date.now().toString(),
    speaker,
    message,
    timestamp: new Date().toISOString()
  });
  
  projects[projectIndex] = project;
  saveProjects(projects);
  
  res.json({ success: true, conversation: project.conversation });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   TeamFlow AI Workspace Server Started     ║
╠════════════════════════════════════════════╣
║   🚀 Server running at:                    ║
║   http://localhost:${PORT}                      ║
║                                            ║
║   Features:                                ║
║   ✓ Collaborative workspace                ║
║   ✓ AI teammate assistance                 ║
║   ✓ PRD generation                         ║
║   ✓ Task management                        ║
║   ✓ Export to Markdown                     ║
╚════════════════════════════════════════════╝
  `);
});
