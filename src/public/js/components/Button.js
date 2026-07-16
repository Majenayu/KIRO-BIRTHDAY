/**
 * Button Component - Reusable button element
 * 
 * Features:
 * - Multiple variants (primary, secondary, success, outline)
 * - Loading state
 * - Disabled state
 * - Size options
 */

class Button {
  constructor(config = {}) {
    this.text = config.text || 'Button';
    this.variant = config.variant || 'primary';
    this.size = config.size || 'md';
    this.onClick = config.onClick || null;
    this.disabled = config.disabled || false;
    this.loading = config.loading || false;
    this.icon = config.icon || '';
    
    this.element = this.create();
  }

  /**
   * Create button DOM element
   */
  create() {
    const button = document.createElement('button');
    
    // Build class list
    let classes = 'btn';
    classes += ` btn-${this.variant}`;
    if (this.size !== 'md') classes += ` btn-${this.size}`;
    
    button.className = classes;
    button.disabled = this.disabled;

    // Build content
    let content = '';
    if (this.loading) {
      content += '<div class="loading"></div>';
    }
    if (this.icon) {
      content += `<span>${this.icon}</span>`;
    }
    content += this.text;

    button.innerHTML = content;

    if (this.onClick && !this.disabled) {
      button.addEventListener('click', this.onClick);
    }

    return button;
  }

  /**
   * Get DOM element
   */
  getElement() {
    return this.element;
  }

  /**
   * Set loading state
   */
  setLoading(isLoading) {
    this.loading = isLoading;
    this.element.disabled = isLoading;
    this.element.innerHTML = isLoading
      ? '<div class="loading"></div>'
      : this.text;
  }

  /**
   * Render button to container
   */
  render(container) {
    if (typeof container === 'string') {
      document.getElementById(container).appendChild(this.element);
    } else {
      container.appendChild(this.element);
    }
  }
}
