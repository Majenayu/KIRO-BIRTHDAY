/**
 * TeamFlow AI Workspace - Main Application
 * 
 * Core Features:
 * - Landing page for project creation
 * - Workspace with human and AI panels
 * - Real-time collaboration
 * - PRD generation and export
 * - Task management
 */

class TeamFlowApp {
  constructor() {
    this.currentProject = null;
    this.sidebar = null;
    this.humanPanel = null;
    this.aiPanel = null;
    this.darkMode = true;
    
    this.init();
  }

  /**
   * Initialize application
   */
  async init() {
    this.loadDarkModePreference();
    await this.loadProjects();
    
    if (this.projects.length === 0) {
      this.showLanding();
    } else {
      this.showWorkspace(this.projects[0]);
    }
  }

  /**
   * Load dark mode preference
   */
  loadDarkModePreference() {
    const saved = localStorage.getItem('teamflow-dark-mode');
    this.darkMode = saved !== null ? saved === 'true' : true;
    this.applyTheme();
  }

  /**
   * Apply theme
   */
  applyTheme() {
    if (this.darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('teamflow-dark-mode', this.darkMode);
  }

  /**
   * Toggle dark mode
   */
  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
  }

  /**
   * Load projects from backend
   */
  async loadProjects() {
    try {
      this.projects = await API.getProjects();
    } catch (error) {
      console.error('Error loading projects:', error);
      this.projects = [];
    }
  }

  /**
   * Show landing page
   */
  showLanding() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="landing">
        <div class="landing-container">
          <div class="landing-logo">🚀</div>
          <h1 class="landing-title">TeamFlow AI Workspace</h1>
          <p class="landing-subtitle">Transform ideas into complete product plans with your AI teammate</p>
          
          <form class="landing-form" id="landing-form">
            <div class="form-group">
              <label for="project-name">Project Name</label>
              <input 
                type="text" 
                id="project-name" 
                name="projectName" 
                placeholder="e.g., AI-Powered Analytics Dashboard"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="project-desc">Project Description</label>
              <textarea 
                id="project-desc" 
                name="projectDescription" 
                placeholder="Brief description of what your project does"
                required
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="problem-statement">Problem Statement</label>
              <textarea 
                id="problem-statement" 
                name="problemStatement" 
                placeholder="What problem are you solving?"
                required
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="goals">Goals</label>
              <textarea 
                id="goals" 
                name="goals" 
                placeholder="What are your main goals for this project?"
                required
              ></textarea>
            </div>
            
            <div class="landing-cta">
              <button type="submit" class="btn btn-primary btn-block">
                Start Workspace
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('landing-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        projectName: document.getElementById('project-name').value,
        projectDescription: document.getElementById('project-desc').value,
        problemStatement: document.getElementById('problem-statement').value,
        goals: document.getElementById('goals').value
      };

      try {
        const project = await API.createProject(formData);
        this.projects.push(project);
        this.showWorkspace(project);
      } catch (error) {
        alert('Error creating project: ' + error.message);
      }
    });
  }

  /**
   * Show workspace
   */
  showWorkspace(project) {
    this.currentProject = project;
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    // Create sidebar
    this.sidebar = new Sidebar({
      onProjectSelect: (proj) => this.showWorkspace(proj)
    });
    this.sidebar.setProjects(this.projects);
    this.sidebar.setActiveProject(project.id);
    mainContainer.appendChild(this.sidebar.getElement());

    // Create content area
    const contentArea = document.createElement('div');
    contentArea.className = 'content-area';

    // Create navbar
    const navbar = this.createNavbar();
    contentArea.appendChild(navbar);

    // Create workspace
    const workspace = document.createElement('div');
    workspace.className = 'workspace';

    // Human panel (left)
    this.humanPanel = new Panel({
      id: 'human-panel',
      title: '👤 Human Panel',
      content: this.getHumanPanelContent(project),
      footer: this.getHumanPanelFooter()
    });
    workspace.appendChild(this.humanPanel.getElement());

    // AI panel (right)
    this.aiPanel = new Panel({
      id: 'ai-panel',
      title: '🤖 AI Teammate',
      content: project.aiResponse 
        ? this.getAIPanelContent(project.aiResponse)
        : '<div class="empty-state"><div class="empty-state-icon">💭</div><div class="empty-state-title">AI Teammate Waiting</div><p>Click "Invite AI Teammate" to generate a complete PRD</p></div>'
    });
    workspace.appendChild(this.aiPanel.getElement());

    contentArea.appendChild(workspace);
    mainContainer.appendChild(contentArea);
    app.appendChild(mainContainer);

    // Bind event listeners
    this.bindEventListeners();
  }

  /**
   * Create navbar
   */
  createNavbar() {
    const navbar = document.createElement('div');
    navbar.className = 'navbar';

    navbar.innerHTML = `
      <h1 class="navbar-title">${this.currentProject.projectName}</h1>
      <div class="navbar-actions">
        <button class="btn btn-outline btn-sm" id="toggle-theme">
          <span id="theme-icon">${this.darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    `;

    navbar.querySelector('#toggle-theme').addEventListener('click', () => {
      this.toggleTheme();
      document.querySelector('#theme-icon').textContent = this.darkMode ? '☀️' : '🌙';
    });

    return navbar;
  }

  /**
   * Get human panel content
   */
  getHumanPanelContent(project) {
    return `
      <div>
        <h3 style="margin-bottom: var(--spacing-md);">Project Details</h3>
        
        <div style="margin-bottom: var(--spacing-lg);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-sm);">Description</h4>
          <p style="color: var(--text-secondary);">${project.projectDescription}</p>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-sm);">Problem Statement</h4>
          <p style="color: var(--text-secondary);">${project.problemStatement}</p>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-sm);">Goals</h4>
          <p style="color: var(--text-secondary);">${project.goals}</p>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-md);">Conversation</h4>
          <div id="conversation" style="max-height: 300px; overflow-y: auto; margin-bottom: var(--spacing-md);">
            ${this.renderConversation(project)}
          </div>
          <div style="display: flex; gap: var(--spacing-sm);">
            <input 
              type="text" 
              id="message-input"
              placeholder="Add your thoughts..."
              style="flex: 1; padding: var(--spacing-sm); border-radius: var(--radius-md); border: 1px solid var(--border); background-color: var(--surface-darker); color: var(--text-primary);"
            >
            <button class="btn btn-sm btn-primary" id="send-message">Send</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get human panel footer
   */
  getHumanPanelFooter() {
    return `
      <button class="btn btn-primary" id="invite-ai" style="width: 100%;">
        🤖 Invite AI Teammate
      </button>
    `;
  }

  /**
   * Get AI panel content
   */
  getAIPanelContent(aiResponse) {
    if (!aiResponse) return '';

    let html = `
      <div style="padding-bottom: var(--spacing-lg);">
        <div style="margin-bottom: var(--spacing-lg);">
          <h3>📋 Executive Summary</h3>
          <p style="color: var(--text-secondary); margin-top: var(--spacing-md);">${aiResponse.projectSummary}</p>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h3>🎯 Objectives</h3>
          <ul style="margin-top: var(--spacing-md); margin-left: var(--spacing-lg);">
            ${aiResponse.objectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h3>👥 Target Users</h3>
          <ul style="margin-top: var(--spacing-md); margin-left: var(--spacing-lg);">
            ${aiResponse.targetUsers.map(user => `<li>${user}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h3>✅ Key Requirements</h3>
          <ul style="margin-top: var(--spacing-md); margin-left: var(--spacing-lg);">
            ${aiResponse.functionalRequirements.slice(0, 5).map(req => `<li>${req}</li>`).join('')}
          </ul>
          ${aiResponse.functionalRequirements.length > 5 ? `<p style="color: var(--text-secondary); margin-top: var(--spacing-md);">... and ${aiResponse.functionalRequirements.length - 5} more</p>` : ''}
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h3>📊 Success Metrics</h3>
          <ul style="margin-top: var(--spacing-md); margin-left: var(--spacing-lg);">
            ${aiResponse.successMetrics.slice(0, 3).map(metric => `<li>${metric}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <h3>📝 Implementation Tasks</h3>
          <div id="tasks-list" style="margin-top: var(--spacing-md);">
            ${this.renderTasks(aiResponse.implementationTasks)}
          </div>
        </div>

        <div style="background: var(--surface-darker); padding: var(--spacing-md); border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
          <h4 style="margin-bottom: var(--spacing-sm);">🎯 Action Items</h4>
          <ul style="margin-left: var(--spacing-lg);">
            <li>Review functional requirements</li>
            <li>Validate target users and use cases</li>
            <li>Refine implementation timeline</li>
            <li>Assign team members to tasks</li>
            <li>Set up tracking and metrics</li>
          </ul>
        </div>
      </div>
    `;

    return html;
  }

  /**
   * Render conversation
   */
  renderConversation(project) {
    if (!project.conversation || project.conversation.length === 0) {
      return '<p style="color: var(--text-secondary); text-align: center;">No messages yet</p>';
    }

    return project.conversation.map(msg => `
      <div class="message ${msg.speaker.toLowerCase()}">
        <div class="message-bubble">
          <p>${msg.message}</p>
          <div class="message-timestamp">${new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render tasks
   */
  renderTasks(tasks) {
    return tasks.map(task => `
      <div class="task-item">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-meta">
            <span>${task.id}</span> • 
            <span class="task-badge ${task.priority.toLowerCase()}">${task.priority}</span> • 
            <span>${task.estimate}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Bind event listeners
   */
  bindEventListeners() {
    // Invite AI
    const inviteBtn = document.getElementById('invite-ai');
    if (inviteBtn) {
      inviteBtn.addEventListener('click', () => this.inviteAI());
    }

    // Send message
    const sendBtn = document.getElementById('send-message');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    const msgInput = document.getElementById('message-input');
    if (msgInput) {
      msgInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Export button
    const exportBtn = document.getElementById('export-prd');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportPRD());
    }
  }

  /**
   * Invite AI teammate
   */
  async inviteAI() {
    try {
      const inviteBtn = document.getElementById('invite-ai');
      inviteBtn.disabled = true;
      inviteBtn.innerHTML = '<div class="loading"></div> Generating...';

      const result = await API.generateAIResponse(this.currentProject.id);
      this.currentProject.aiResponse = result.aiResponse;

      // Update AI panel
      this.aiPanel.setContent(this.getAIPanelContent(result.aiResponse));
      this.aiPanel.appendContent(this.createExportFooter());

      inviteBtn.disabled = false;
      inviteBtn.innerHTML = '✅ AI Teammate Ready!';
      setTimeout(() => {
        inviteBtn.innerHTML = '🤖 Invite AI Teammate';
      }, 3000);

      // Add to conversation
      await API.addMessage(this.currentProject.id, 'AI', 'I\'ve analyzed your project and created a comprehensive PRD with all requirements, user stories, and implementation tasks.');

      // Refresh conversation
      const humanPanel = document.getElementById('human-panel');
      if (humanPanel) {
        const convArea = humanPanel.querySelector('#conversation');
        if (convArea) {
          convArea.innerHTML = this.renderConversation(this.currentProject);
        }
      }
    } catch (error) {
      alert('Error generating AI response: ' + error.message);
      document.getElementById('invite-ai').disabled = false;
      document.getElementById('invite-ai').innerHTML = '🤖 Invite AI Teammate';
    }
  }

  /**
   * Send message
   */
  async sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    try {
      input.value = '';
      input.disabled = true;

      await API.addMessage(this.currentProject.id, 'Human', message);

      // Refresh project
      this.currentProject = await API.getProject(this.currentProject.id);

      // Update conversation
      const convArea = document.getElementById('conversation');
      if (convArea) {
        convArea.innerHTML = this.renderConversation(this.currentProject);
        convArea.scrollTop = convArea.scrollHeight;
      }

      input.disabled = false;
      input.focus();
    } catch (error) {
      alert('Error sending message: ' + error.message);
      input.disabled = false;
    }
  }

  /**
   * Create export footer
   */
  createExportFooter() {
    return `
      <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--border);">
        <h4 style="margin-bottom: var(--spacing-md);">📥 Export Options</h4>
        <div style="display: flex; gap: var(--spacing-md);">
          <button class="btn btn-sm btn-primary" id="export-prd">
            📄 Export as Markdown
          </button>
          <button class="btn btn-sm btn-outline" id="copy-prd">
            📋 Copy to Clipboard
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Export PRD
   */
  async exportPRD() {
    try {
      const result = await API.exportProject(this.currentProject.id);
      
      // Create download link
      const blob = new Blob([result.markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error exporting PRD: ' + error.message);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TeamFlowApp();
});
