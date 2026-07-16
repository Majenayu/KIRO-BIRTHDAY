/**
 * Modal Component - Reusable modal dialog
 * 
 * Features:
 * - Show/hide modal
 * - Custom content
 * - Close button
 * - Overlay click to close
 */

class Modal {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.overlay = null;
    this.modal = null;
    this.isOpen = false;
    
    this.init();
  }

  /**
   * Initialize modal DOM structure
   */
  init() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    this.overlay.id = `${this.id}-overlay`;
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Create modal
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <div class="modal-header">
        <h2>${this.title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body" id="${this.id}-body"></div>
      <div class="modal-footer" id="${this.id}-footer"></div>
    `;

    this.overlay.appendChild(this.modal);
    document.body.appendChild(this.overlay);

    // Close button
    this.modal.querySelector('.modal-close').addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * Set modal content
   */
  setContent(html) {
    this.modal.querySelector(`#${this.id}-body`).innerHTML = html;
  }

  /**
   * Set footer content
   */
  setFooter(html) {
    this.modal.querySelector(`#${this.id}-footer`).innerHTML = html;
  }

  /**
   * Show modal
   */
  open() {
    this.overlay.classList.add('active');
    this.isOpen = true;
  }

  /**
   * Hide modal
   */
  close() {
    this.overlay.classList.remove('active');
    this.isOpen = false;
  }

  /**
   * Clean up
   */
  destroy() {
    this.overlay.remove();
  }
}
