/**
 * Sidebar Component - Navigation and project list
 * 
 * Features:
 * - Project list display
 * - Active project highlighting
 * - Quick access buttons
 */

class Sidebar {
  constructor(config = {}) {
    this.onProjectSelect = config.onProjectSelect || null;
    this.projects = [];
    this.activeProjectId = null;
    
    this.element = this.create();
  }

  /**
   * Create sidebar DOM element
   */
  create() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <h1>🤝 TeamFlow</h1>
        <p>AI Workspace</p>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-projects" id="sidebar-projects"></div>
      </div>
      <div class="sidebar-footer">
        <p style="font-size: 0.75rem; color: var(--text-secondary);">
          © 2026 TeamFlow AI
        </p>
      </div>
    `;

    return sidebar;
  }

  /**
   * Get DOM element
   */
  getElement() {
    return this.element;
  }

  /**
   * Set projects list
   */
  setProjects(projects) {
    this.projects = projects;
    this.render();
  }

  /**
   * Render projects
   */
  render() {
    const container = this.element.querySelector('#sidebar-projects');
    container.innerHTML = '';

    if (this.projects.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: var(--spacing-lg);">No projects yet</p>';
      return;
    }

    this.projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'sidebar-project-item';
      if (project.id === this.activeProjectId) {
        item.classList.add('active');
      }

      item.innerHTML = `
        <h3>${project.projectName}</h3>
        <p>${new Date(project.createdAt).toLocaleDateString()}</p>
      `;

      item.addEventListener('click', () => {
        this.activeProjectId = project.id;
        this.render();
        if (this.onProjectSelect) {
          this.onProjectSelect(project);
        }
      });

      container.appendChild(item);
    });
  }

  /**
   * Set active project
   */
  setActiveProject(projectId) {
    this.activeProjectId = projectId;
    this.render();
  }
}
