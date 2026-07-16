# TeamFlow AI Workspace - Coding Style Guide

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Scope:** All project code

## Overview

This guide establishes consistent code style, naming conventions, and architectural patterns for TeamFlow AI Workspace. Following these standards ensures maintainability, readability, and collaboration quality.

## JavaScript Conventions

### File Organization

```javascript
/**
 * ComponentName.js - Brief description
 * 
 * Responsibilities:
 * - Primary responsibility 1
 * - Primary responsibility 2
 * 
 * Dependencies:
 * - Dependency 1
 * - Dependency 2
 */

// 1. Imports
// 2. Constants
// 3. Class/Function definitions
// 4. Exports
```

### Naming Conventions

**Classes**
- PascalCase for class names
- One public class per file
- Descriptive names indicating purpose

```javascript
class ProjectManager { }
class AIResponseGenerator { }
class DataPersistenceLayer { }
```

**Functions**
- camelCase for function and method names
- Verb-first for actions
- Descriptive without being verbose

```javascript
// ✓ Good
function createProject() { }
function generateAIResponse() { }
async function saveProject() { }

// ✗ Bad
function create() { }
function gen() { }
function save_project() { }
```

**Variables**
- camelCase for variable names
- Avoid single-letter variables (except in loops)
- Use descriptive names indicating content

```javascript
// ✓ Good
const userInput = getUserInput();
let isProcessing = false;
const projects = [];

// ✗ Bad
const x = getUserInput();
let proc = false;
const p = [];
```

**Constants**
- UPPER_SNAKE_CASE for constants
- Define at module level
- Document purpose

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
const DEFAULT_TIMEOUT = 5000;
const MAX_PROJECT_NAME_LENGTH = 100;
```

**Boolean Variables**
- Prefix with `is`, `has`, `can`, `should`
- Makes intent clear

```javascript
const isLoading = true;
const hasError = false;
const canExport = true;
const shouldRetry = false;
```

### Comments

**File Headers**
```javascript
/**
 * FileName.js - One-line description
 * 
 * Detailed description of what this file does,
 * its responsibilities, and how it fits into
 * the larger application.
 */
```

**Function Comments**
```javascript
/**
 * Brief description of what function does
 * 
 * @param {type} paramName - Parameter description
 * @returns {type} Description of return value
 * @throws {ErrorType} When this error occurs
 * 
 * @example
 * const result = functionName(param);
 */
function functionName(paramName) {
  // Implementation
}
```

**Inline Comments**
- Explain WHY, not WHAT
- Use for non-obvious logic
- Keep brief and clear

```javascript
// ✓ Good
// Retry logic handles temporary network failures
async function fetchWithRetry() { }

// ✗ Bad
// Fetch data
async function fetchWithRetry() { }
```

**Block Comments**
```javascript
// ============================================
// SECTION HEADER
// ============================================

// Related functionality grouped together
```

### Code Structure

**Error Handling**
```javascript
// ✓ Good - Try-catch with specific handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Specific error context:', error);
  throw new Error(`Failed to complete operation: ${error.message}`);
}

// ✗ Bad - Silent failure
try {
  const result = await riskyOperation();
} catch (error) {
  // Ignore
}
```

**Async/Await**
```javascript
// ✓ Good - Clear async flow
async function processProject(projectId) {
  try {
    const project = await getProject(projectId);
    const aiResponse = await generateResponse(project);
    await saveProject(projectId, project);
    return aiResponse;
  } catch (error) {
    console.error('Error processing project:', error);
    throw error;
  }
}

// ✗ Bad - Callback hell
function processProject(projectId, callback) {
  getProject(projectId, (err, project) => {
    if (err) callback(err);
    generateResponse(project, (err, response) => {
      if (err) callback(err);
      saveProject(projectId, project, (err) => {
        callback(null, response);
      });
    });
  });
}
```

**Conditionals**
```javascript
// ✓ Good - Early return
function validateProject(project) {
  if (!project.name) {
    throw new Error('Project name required');
  }
  if (!project.description) {
    throw new Error('Project description required');
  }
  return true;
}

// ✗ Bad - Nested conditions
function validateProject(project) {
  if (project.name) {
    if (project.description) {
      return true;
    }
  }
  return false;
}
```

## Component Architecture

### Component Pattern

All frontend components follow this structure:

```javascript
class ComponentName {
  /**
   * Constructor - Initialize component
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.id = config.id || this.generateId();
    this.element = this.create();
  }

  /**
   * Create DOM element
   * @private
   * @returns {HTMLElement} Component element
   */
  create() {
    const element = document.createElement('div');
    element.className = 'component-class';
    element.innerHTML = this.getTemplate();
    return element;
  }

  /**
   * Get HTML template
   * @private
   * @returns {string} HTML template
   */
  getTemplate() {
    return `<div>Content</div>`;
  }

  /**
   * Get DOM element
   * @public
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Render component to container
   * @param {string|HTMLElement} container
   */
  render(container) {
    if (typeof container === 'string') {
      document.getElementById(container).appendChild(this.element);
    } else {
      container.appendChild(this.element);
    }
  }

  /**
   * Clean up resources
   * @public
   */
  destroy() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
```

### Component Responsibilities

**Single Responsibility Principle**
- Each component handles one logical task
- Clear inputs and outputs
- Minimal dependencies

```javascript
// ✓ Good - Focused responsibility
class TaskList {
  constructor(tasks) {
    this.tasks = tasks;
    this.element = this.create();
  }
  // Renders tasks, nothing else
}

// ✗ Bad - Too many responsibilities
class TaskManager {
  // Manages tasks, fetches from API, handles storage, renders UI
}
```

**Reusability**
- Components accept configuration
- No hardcoded values
- Generic enough for multiple uses

```javascript
// ✓ Good - Reusable
class Button {
  constructor(config) {
    this.text = config.text;
    this.variant = config.variant;
    this.onClick = config.onClick;
  }
}

const saveBtn = new Button({ text: 'Save', variant: 'primary' });
const deleteBtn = new Button({ text: 'Delete', variant: 'danger' });

// ✗ Bad - Not reusable
class SaveButton {
  constructor() {
    this.text = 'Save';
    this.variant = 'primary';
  }
}
```

## Modular Structure

### Module Organization

```
src/public/js/
├── app.js              # Main application controller
├── api.js              # API communication layer
└── components/
    ├── Modal.js        # Modal component
    ├── Card.js         # Card component
    ├── Button.js       # Button component
    ├── Panel.js        # Panel component
    └── Sidebar.js      # Sidebar component
```

### Dependency Management

- Minimal external dependencies
- Clear import/export patterns
- No circular dependencies

```javascript
// ✓ Good - Clear dependencies
class ProjectWorkspace {
  constructor() {
    this.sidebar = new Sidebar();
    this.panel = new Panel();
  }
}

// ✗ Bad - Hidden dependencies
class ProjectWorkspace {
  loadComponents() {
    // Creates components internally
    const sidebar = new Sidebar();
  }
}
```

## CSS Conventions

### Organization

```css
/**
 * File: styles.css
 * Description: Main stylesheet for TeamFlow AI
 */

/* Section Header */
/* ============================================ */

.class-name {
  /* Properties */
}
```

### Naming

- kebab-case for class names
- BEM (Block Element Modifier) for complex components
- Descriptive names

```css
/* ✓ Good */
.sidebar { }
.sidebar-header { }
.sidebar-project-item { }
.sidebar-project-item.active { }

/* ✗ Bad */
.sb { }
.nav { }
.item1 { }
.x { }
```

### Properties Order

```css
.element {
  /* Display & Layout */
  display: flex;
  flex-direction: column;
  
  /* Sizing */
  width: 100%;
  height: auto;
  
  /* Spacing */
  margin: 0;
  padding: var(--spacing-md);
  
  /* Colors */
  background-color: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  
  /* Typography */
  font-size: var(--font-size-md);
  font-weight: 500;
  
  /* Visual Effects */
  border-radius: var(--radius-md);
  box-shadow: none;
  opacity: 1;
  
  /* Transforms & Transitions */
  transform: translateY(0);
  transition: var(--transition);
}
```

### Variables Usage

Use CSS custom properties for theming:

```css
:root {
  --primary: #6366f1;
  --text-primary: #f1f5f9;
  --spacing-md: 1rem;
  --font-size-md: 1rem;
}

.button {
  background-color: var(--primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
}
```

## HTML Conventions

### Semantic Structure

```html
<!-- ✓ Good - Semantic HTML -->
<header class="navbar">
  <h1>Title</h1>
  <nav>Content</nav>
</header>

<main class="workspace">
  <article class="panel">Content</article>
</main>

<footer>Information</footer>

<!-- ✗ Bad - Non-semantic -->
<div class="header">
  <div class="title">Title</div>
  <div class="nav">Content</div>
</div>
```

### IDs and Classes

- Use IDs sparingly (for JavaScript targeting)
- Prefer classes for styling
- Descriptive naming

```html
<!-- ✓ Good -->
<div id="sidebar" class="sidebar sidebar-active">
  <h2 class="sidebar-header">Projects</h2>
</div>

<!-- ✗ Bad -->
<div id="s1" class="x">
  <h2>Projects</h2>
</div>
```

## API Conventions

### Endpoint Structure

```javascript
// Base URL
const API_BASE = '/api';

// Endpoints follow REST patterns
GET   /api/projects              // List
POST  /api/projects              // Create
GET   /api/projects/:id          // Read
PUT   /api/projects/:id          // Update
DELETE /api/projects/:id         // Delete
```

### Error Handling

```javascript
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
} catch (error) {
  console.error('API Error:', error);
  throw error;
}
```

## Testing Patterns

### Console Logging

```javascript
// ✓ Good - Contextual logging
console.log('Loading projects...');
console.error('Error fetching projects:', error);
console.warn('Deprecated API endpoint used');

// ✗ Bad - Meaningless logs
console.log('x');
console.log(data);
```

### Debugging

- Use browser DevTools
- Add strategic console.logs
- Use debugger statements for breakpoints

## Performance Considerations

### DOM Manipulation

```javascript
// ✓ Good - Batch updates
const fragment = document.createDocumentFragment();
items.forEach(item => {
  fragment.appendChild(createItemElement(item));
});
container.appendChild(fragment);

// ✗ Bad - Multiple reflows
items.forEach(item => {
  container.appendChild(createItemElement(item));
});
```

### Event Listeners

```javascript
// ✓ Good - Event delegation
container.addEventListener('click', (e) => {
  if (e.target.matches('.item-delete')) {
    handleDelete(e.target.dataset.id);
  }
});

// ✗ Bad - Multiple listeners
items.forEach(item => {
  item.addEventListener('click', () => { });
});
```

## Code Review Checklist

Before submitting code:

- [ ] Follows naming conventions
- [ ] Has proper comments
- [ ] Error handling implemented
- [ ] No console errors/warnings
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works correctly
- [ ] Performance acceptable
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Tests pass (if applicable)
- [ ] Documentation updated

## Example: Well-Structured Component

```javascript
/**
 * ProjectCard.js - Displays project information
 * 
 * Renders a card containing project details,
 * status, and quick actions. Emits events
 * for user interactions.
 */

class ProjectCard {
  constructor(config = {}) {
    this.project = config.project;
    this.onSelect = config.onSelect || null;
    this.onDelete = config.onDelete || null;
    
    this.element = this.create();
  }

  /**
   * Create card DOM structure
   * @private
   * @returns {HTMLElement}
   */
  create() {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = this.getTemplate();
    
    this.bindEvents();
    return card;
  }

  /**
   * Get card template
   * @private
   * @returns {string} HTML template
   */
  getTemplate() {
    return `
      <h3>${this.project.name}</h3>
      <p>${this.project.description}</p>
      <div class="actions">
        <button class="btn-select">View</button>
        <button class="btn-delete">Remove</button>
      </div>
    `;
  }

  /**
   * Bind event listeners
   * @private
   */
  bindEvents() {
    this.element.querySelector('.btn-select').addEventListener('click', () => {
      this.onSelect?.(this.project);
    });
    
    this.element.querySelector('.btn-delete').addEventListener('click', () => {
      this.onDelete?.(this.project.id);
    });
  }

  /**
   * Get DOM element
   * @public
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Render to container
   * @public
   * @param {HTMLElement} container
   */
  render(container) {
    container.appendChild(this.element);
  }
}
```

## Summary

Following these conventions ensures:
- Readable, maintainable code
- Consistent codebase
- Easier collaboration
- Better bug prevention
- Improved performance

When in doubt, prioritize **clarity over cleverness**.
