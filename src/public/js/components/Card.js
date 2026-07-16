/**
 * Card Component - Reusable content card
 * 
 * Features:
 * - Header, body, footer sections
 * - Flexible content
 * - Hover effects
 */

class Card {
  constructor(config = {}) {
    this.title = config.title || '';
    this.description = config.description || '';
    this.body = config.body || '';
    this.footer = config.footer || '';
    this.onClick = config.onClick || null;
    
    this.element = this.create();
  }

  /**
   * Create card DOM element
   */
  create() {
    const card = document.createElement('div');
    card.className = 'card';

    let html = '';
    
    if (this.title) {
      html += `<div class="card-header">`;
      html += `  <h3>${this.title}</h3>`;
      if (this.description) {
        html += `  <p class="card-description">${this.description}</p>`;
      }
      html += `</div>`;
    }

    if (this.body) {
      html += `<div class="card-body">${this.body}</div>`;
    }

    if (this.footer) {
      html += `<div class="card-footer">${this.footer}</div>`;
    }

    card.innerHTML = html;

    if (this.onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', this.onClick);
    }

    return card;
  }

  /**
   * Get DOM element
   */
  getElement() {
    return this.element;
  }

  /**
   * Update card content
   */
  update(config) {
    if (config.title) this.title = config.title;
    if (config.description) this.description = config.description;
    if (config.body) this.body = config.body;
    if (config.footer) this.footer = config.footer;
    
    this.element = this.create();
  }

  /**
   * Render card to container
   */
  render(container) {
    if (typeof container === 'string') {
      document.getElementById(container).appendChild(this.element);
    } else {
      container.appendChild(this.element);
    }
  }
}
