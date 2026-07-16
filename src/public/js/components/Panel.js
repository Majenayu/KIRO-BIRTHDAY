/**
 * Panel Component - Reusable workspace panel
 * 
 * Features:
 * - Header with title
 * - Content area
 * - Footer with actions
 * - Flexible layout
 */

class Panel {
  constructor(config = {}) {
    this.id = config.id || 'panel-' + Math.random().toString(36).substr(2, 9);
    this.title = config.title || 'Panel';
    this.content = config.content || '';
    this.footer = config.footer || '';
    this.headerActions = config.headerActions || '';
    
    this.element = this.create();
  }

  /**
   * Create panel DOM element
   */
  create() {
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = this.id;

    panel.innerHTML = `
      <div class="panel-header">
        <h2>${this.title}</h2>
        <div>${this.headerActions}</div>
      </div>
      <div class="panel-content" id="${this.id}-content">
        ${this.content}
      </div>
      ${this.footer ? `<div class="panel-footer">${this.footer}</div>` : ''}
    `;

    return panel;
  }

  /**
   * Get DOM element
   */
  getElement() {
    return this.element;
  }

  /**
   * Update content
   */
  setContent(html) {
    const contentArea = this.element.querySelector(`#${this.id}-content`);
    if (contentArea) {
      contentArea.innerHTML = html;
    }
  }

  /**
   * Append to content
   */
  appendContent(html) {
    const contentArea = this.element.querySelector(`#${this.id}-content`);
    if (contentArea) {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      contentArea.appendChild(temp.firstElementChild);
    }
  }

  /**
   * Clear content
   */
  clearContent() {
    const contentArea = this.element.querySelector(`#${this.id}-content`);
    if (contentArea) {
      contentArea.innerHTML = '';
    }
  }

  /**
   * Render to container
   */
  render(container) {
    if (typeof container === 'string') {
      document.getElementById(container).appendChild(this.element);
    } else {
      container.appendChild(this.element);
    }
  }
}
