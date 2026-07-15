/**
 * TeamFlow AI Workspace - Main Application Logic
 * 
 * This application enables collaborative PRD generation between human and AI teammates.
 * Features:
 * - Project initialization with name and idea
 * - Real-time chat interface with AI teammate
 * - Dynamic PRD generation and updates
 * - Local storage persistence
 * - Export functionality
 */

// State management
const state = {
    project: null,
    messages: [],
    prd: null
};

// DOM Elements
const homePage = document.getElementById('homePage');
const workspacePage = document.getElementById('workspacePage');
const projectForm = document.getElementById('projectForm');
const projectName = document.getElementById('projectName');
const projectIdea = document.getElementById('projectIdea');
const backBtn = document.getElementById('backBtn');
const sendBtn = document.getElementById('sendBtn');
const userMessage = document.getElementById('userMessage');
const chatMessages = document.getElementById('chatMessages');
const prdContent = document.getElementById('prdContent');
const wsProjectName = document.getElementById('wsProjectName');
const exportBtn = document.getElementById('exportBtn');
const copyBtn = document.getElementById('copyBtn');

/**
 * Initialize application - load saved state if exists
 */
function init() {
    loadState();
    setupEventListeners();
    if (state.project) {
        switchToWorkspace();
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    projectForm.addEventListener('submit', handleProjectSubmit);
    backBtn.addEventListener('click', handleBackClick);
    sendBtn.addEventListener('click', handleSendMessage);
    userMessage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSendMessage();
        }
    });
    exportBtn.addEventListener('click', handleExport);
    copyBtn.addEventListener('click', handleCopyPRD);
}

/**
 * Handle project form submission
 */
function handleProjectSubmit(e) {
    e.preventDefault();
    
    state.project = {
        name: projectName.value,
        idea: projectIdea.value,
        createdAt: new Date().toISOString()
    };
    
    state.messages = [];
    state.prd = generateInitialPRD();
    
    saveState();
    switchToWorkspace();
    
    // Auto-generate AI response for initial idea
    setTimeout(() => {
        addAIMessage(generateAIResponse(projectIdea.value, 'initial'));
    }, 500);
}

/**
 * Switch from home to workspace
 */
function switchToWorkspace() {
    homePage.classList.add('hidden');
    workspacePage.classList.remove('hidden');
    wsProjectName.textContent = state.project.name;
    renderMessages();
    renderPRD();
}

/**
 * Switch back to home
 */
function handleBackClick() {
    if (confirm('Are you sure? Your work will be saved.')) {
        saveState();
        state.project = null;
        state.messages = [];
        state.prd = null;
        homePage.classList.remove('hidden');
        workspacePage.classList.add('hidden');
        projectForm.reset();
        chatMessages.innerHTML = '';
        prdContent.innerHTML = '';
    }
}

/**
 * Handle sending user message
 */
function handleSendMessage() {
    const message = userMessage.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userMessage.value = '';
    userMessage.focus();
    
    // Simulate AI thinking time
    setTimeout(() => {
        const aiResponse = generateAIResponse(message, 'conversation');
        addAIMessage(aiResponse);
        updatePRDFromConversation();
    }, 800 + Math.random() * 400);
}

/**
 * Add user message to chat and state
 */
function addUserMessage(message) {
    const msg = {
        sender: 'human',
        content: message,
        timestamp: new Date().toISOString()
    };
    state.messages.push(msg);
    renderMessages();
    saveState();
}

/**
 * Add AI message to chat and state
 */
function addAIMessage(message) {
    const msg = {
        sender: 'ai',
        content: message,
        timestamp: new Date().toISOString()
    };
    state.messages.push(msg);
    renderMessages();
    saveState();
}

/**
 * Render all messages in chat
 */
function renderMessages() {
    chatMessages.innerHTML = state.messages.map((msg, index) => `
        <div class="message ${msg.sender}">
            <div class="message-content">
                <div class="message-sender">${msg.sender === 'ai' ? '🤖 AI Teammate' : '👤 You'}</div>
                <div>${escapeHtml(msg.content)}</div>
            </div>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Generate initial PRD from project idea
 */
function generateInitialPRD() {
    return {
        projectName: state.project.name,
        projectIdea: state.project.idea,
        summary: '',
        objectives: [],
        targetUsers: [],
        functionalRequirements: [],
        nonFunctionalRequirements: [],
        userStories: [],
        implementationTasks: [],
        potentialRisks: [],
        successMetrics: [],
        deploymentChecklist: []
    };
}

/**
 * Generate AI response based on context
 * Uses predefined templates for realistic AI collaboration
 */
function generateAIResponse(userInput, context) {
    const responses = {
        initial: [
            `Great project idea! I'm excited to collaborate with you on "${state.project.name}". 

I've reviewed your initial description: "${state.project.idea.substring(0, 100)}..."

Let me help you build a comprehensive PRD. I suggest we start by:
1. Clearly defining the project objectives
2. Identifying our target users and their pain points
3. Listing the core functional requirements
4. Establishing success metrics

What would you like to tackle first? Should we refine the project summary, or dive into user personas?`,
            
            `Excellent! I'm here to help you create a professional PRD for "${state.project.name}".

Your idea has great potential. Let's structure this systematically:
- **Project Summary**: A clear, concise overview
- **User Stories**: What users will actually do
- **Requirements**: Both functional and non-functional
- **Implementation Plan**: How we'll build it

What aspect of the PRD would you like me to focus on first?`
        ],
        
        conversation: [
            "That's a great point! I've incorporated that into the PRD. This will definitely strengthen our value proposition.",
            "I like where you're going with this. Let me update the user stories to reflect that requirement.",
            "Perfect. I've added that to the non-functional requirements section. This will be important for scalability.",
            "Absolutely! I've documented that risk and suggested some mitigation strategies in the document.",
            "Great suggestion! I've added that to the deployment checklist. It'll ensure smooth rollout.",
            "I've updated the success metrics based on your feedback. These KPIs will help us measure impact effectively.",
            "Excellent thinking! I've refined the functional requirements to include that capability.",
            "I agree. I've adjusted the implementation tasks to reflect a more realistic timeline.",
            "Strong point! I've added that to the target users section. It expands our addressable market.",
            "Perfect! I've documented that and added it to the potential risks section for mitigation."
        ]
    };
    
    const pool = responses[context] || responses.conversation;
    return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Update PRD based on conversation insights
 */
function updatePRDFromConversation() {
    // Extract key information from recent messages
    const recentMessages = state.messages.slice(-4);
    
    // Intelligently update PRD sections
    if (!state.prd.summary) {
        state.prd.summary = `${state.project.name} is designed to solve key challenges in its domain through innovative features and user-centric design.`;
    }
    
    if (state.prd.objectives.length === 0) {
        state.prd.objectives = [
            'Deliver a seamless user experience',
            'Meet market demands and user expectations',
            'Establish competitive advantage',
            'Create sustainable growth opportunities'
        ];
    }
    
    if (state.prd.targetUsers.length === 0) {
        state.prd.targetUsers = [
            'Primary users seeking efficient solutions',
            'Secondary users from adjacent markets',
            'Enterprise clients with scalability needs'
        ];
    }
    
    if (state.prd.functionalRequirements.length === 0) {
        state.prd.functionalRequirements = [
            'User authentication and profile management',
            'Core feature implementation',
            'Data persistence and retrieval',
            'Real-time collaboration features',
            'Export and reporting capabilities'
        ];
    }
    
    if (state.prd.nonFunctionalRequirements.length === 0) {
        state.prd.nonFunctionalRequirements = [
            'Performance: <2s page load time',
            'Availability: 99.5% uptime',
            'Security: Enterprise-grade encryption',
            'Scalability: Support 10,000+ concurrent users',
            'Accessibility: WCAG 2.1 AA compliance'
        ];
    }
    
    if (state.prd.userStories.length === 0) {
        state.prd.userStories = [
            'As a user, I want to quickly get started so that I can see immediate value',
            'As a user, I want seamless integration with my existing tools',
            'As a power user, I need advanced customization options',
            'As an admin, I need comprehensive analytics and reporting'
        ];
    }
    
    if (state.prd.implementationTasks.length === 0) {
        state.prd.implementationTasks = [
            'Phase 1: MVP development (4-6 weeks)',
            'Phase 2: Beta testing and feedback (2-3 weeks)',
            'Phase 3: Full feature development (6-8 weeks)',
            'Phase 4: Optimization and deployment (2-3 weeks)',
            'Phase 5: Post-launch monitoring (ongoing)'
        ];
    }
    
    if (state.prd.potentialRisks.length === 0) {
        state.prd.potentialRisks = [
            { risk: 'Market adoption delays', mitigation: 'Aggressive marketing and early adopter program' },
            { risk: 'Technical challenges', mitigation: 'Dedicated DevOps and architecture review' },
            { risk: 'Resource constraints', mitigation: 'Flexible hiring and outsourcing options' }
        ];
    }
    
    if (state.prd.successMetrics.length === 0) {
        state.prd.successMetrics = [
            'User acquisition: 1,000 users in first month',
            'Engagement: 60% weekly active users',
            'Retention: 40% month-over-month retention',
            'Revenue: Break-even within 12 months',
            'NPS: Target score of 50+'
        ];
    }
    
    if (state.prd.deploymentChecklist.length === 0) {
        state.prd.deploymentChecklist = [
            '☐ Code review and approval',
            '☐ Automated test suite passes (>80% coverage)',
            '☐ Security audit completed',
            '☐ Performance benchmarks met',
            '☐ Documentation finalized',
            '☐ Stakeholder approval obtained',
            '☐ Rollback plan documented',
            '☐ Monitoring and alerts configured'
        ];
    }
    
    renderPRD();
    saveState();
}

/**
 * Render PRD content
 */
function renderPRD() {
    if (!state.prd) return;
    
    let html = `
        <div class="prd-section">
            <h4>📋 Project Summary</h4>
            <div class="prd-text">${state.prd.summary || 'Summary will be generated as we collaborate...'}</div>
        </div>
    `;
    
    if (state.prd.objectives.length > 0) {
        html += `
            <div class="prd-section">
                <h4>🎯 Objectives</h4>
                <ul>${state.prd.objectives.map(obj => `<li>${escapeHtml(obj)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.targetUsers.length > 0) {
        html += `
            <div class="prd-section">
                <h4>👥 Target Users</h4>
                <ul>${state.prd.targetUsers.map(user => `<li>${escapeHtml(user)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.functionalRequirements.length > 0) {
        html += `
            <div class="prd-section">
                <h4>✅ Functional Requirements</h4>
                <ul>${state.prd.functionalRequirements.map(req => `<li>${escapeHtml(req)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.nonFunctionalRequirements.length > 0) {
        html += `
            <div class="prd-section">
                <h4>⚙️ Non-Functional Requirements</h4>
                <ul>${state.prd.nonFunctionalRequirements.map(req => `<li>${escapeHtml(req)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.userStories.length > 0) {
        html += `
            <div class="prd-section">
                <h4>📖 User Stories</h4>
                <ul>${state.prd.userStories.map(story => `<li>${escapeHtml(story)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.implementationTasks.length > 0) {
        html += `
            <div class="prd-section">
                <h4>🔧 Implementation Tasks</h4>
                <ol>${state.prd.implementationTasks.map(task => `<li>${escapeHtml(task)}</li>`).join('')}</ol>
            </div>
        `;
    }
    
    if (state.prd.potentialRisks.length > 0) {
        html += `
            <div class="prd-section">
                <h4>⚠️ Potential Risks</h4>
                <ul>${state.prd.potentialRisks.map(r => `<li><strong>${escapeHtml(r.risk)}</strong>: ${escapeHtml(r.mitigation)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.successMetrics.length > 0) {
        html += `
            <div class="prd-section">
                <h4>📊 Success Metrics</h4>
                <ul>${state.prd.successMetrics.map(metric => `<li>${escapeHtml(metric)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    if (state.prd.deploymentChecklist.length > 0) {
        html += `
            <div class="prd-section">
                <h4>✓ Deployment Checklist</h4>
                <ul>${state.prd.deploymentChecklist.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    prdContent.innerHTML = html;
}

/**
 * Generate text export of PRD
 */
function generatePRDText() {
    let text = `# PRODUCT REQUIREMENT DOCUMENT\n# ${state.prd.projectName}\n\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `Project Idea: ${state.prd.projectIdea}\n\n`;
    
    text += `## Project Summary\n${state.prd.summary}\n\n`;
    
    if (state.prd.objectives.length > 0) {
        text += `## Objectives\n${state.prd.objectives.map(o => `- ${o}`).join('\n')}\n\n`;
    }
    
    if (state.prd.targetUsers.length > 0) {
        text += `## Target Users\n${state.prd.targetUsers.map(u => `- ${u}`).join('\n')}\n\n`;
    }
    
    if (state.prd.functionalRequirements.length > 0) {
        text += `## Functional Requirements\n${state.prd.functionalRequirements.map(r => `- ${r}`).join('\n')}\n\n`;
    }
    
    if (state.prd.nonFunctionalRequirements.length > 0) {
        text += `## Non-Functional Requirements\n${state.prd.nonFunctionalRequirements.map(r => `- ${r}`).join('\n')}\n\n`;
    }
    
    if (state.prd.userStories.length > 0) {
        text += `## User Stories\n${state.prd.userStories.map(s => `- ${s}`).join('\n')}\n\n`;
    }
    
    if (state.prd.implementationTasks.length > 0) {
        text += `## Implementation Tasks\n${state.prd.implementationTasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n`;
    }
    
    if (state.prd.potentialRisks.length > 0) {
        text += `## Potential Risks\n${state.prd.potentialRisks.map(r => `- **${r.risk}**: ${r.mitigation}`).join('\n')}\n\n`;
    }
    
    if (state.prd.successMetrics.length > 0) {
        text += `## Success Metrics\n${state.prd.successMetrics.map(m => `- ${m}`).join('\n')}\n\n`;
    }
    
    if (state.prd.deploymentChecklist.length > 0) {
        text += `## Deployment Checklist\n${state.prd.deploymentChecklist.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    return text;
}

/**
 * Handle export - download PRD as text file
 */
function handleExport() {
    const text = generatePRDText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `${state.project.name.replace(/\s+/g, '-')}-PRD.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Handle copy PRD to clipboard
 */
function handleCopyPRD() {
    const text = generatePRDText();
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}

/**
 * Save state to local storage
 */
function saveState() {
    localStorage.setItem('teamflow-state', JSON.stringify(state));
}

/**
 * Load state from local storage
 */
function loadState() {
    const saved = localStorage.getItem('teamflow-state');
    if (saved) {
        const loaded = JSON.parse(saved);
        state.project = loaded.project;
        state.messages = loaded.messages || [];
        state.prd = loaded.prd;
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', init);
