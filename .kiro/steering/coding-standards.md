# Coding Standards - TeamFlow AI Workspace

## Overview

This steering file defines the coding standards and best practices for the TeamFlow AI Workspace project. All code should follow these guidelines to ensure consistency, maintainability, and quality.

## JavaScript Standards

### Code Organization
- Group related functions together
- Place event listeners setup in a dedicated `setupEventListeners()` function
- Use descriptive function names that clearly indicate purpose
- Organize functions by feature area (UI, State, Export, etc.)

### Naming Conventions
- **Functions**: Use camelCase, verb-first naming
  ```javascript
  handleProjectSubmit()
  generateAIResponse()
  renderMessages()
  saveState()
  ```

- **Variables**: Use camelCase
  ```javascript
  userMessage
  chatMessages
  projectName
  ```

- **Constants**: Use UPPER_SNAKE_CASE
  ```javascript
  const PRIMARY_COLOR = '#2563eb';
  const STORAGE_KEY = 'teamflow-state';
  ```

- **DOM Elements**: Prefix with dollar sign or clear naming
  ```javascript
  const projectForm = document.getElementById('projectForm');
  const homePage = document.getElementById('homePage');
  ```

### Comments & Documentation
- Add comprehensive function docstrings
  ```javascript
  /**
   * Description of what the function does
   * @param {type} paramName - Description
   * @returns {type} Description of return value
   */
  ```

- Explain complex logic with inline comments
- Use section comments for logical groups
- Keep comments up-to-date with code

### Functions

#### Single Responsibility
Each function should do one thing well:
```javascript
// ✅ Good - clear single purpose
function saveState() {
    localStorage.setItem('teamflow-state', JSON.stringify(state));
}

// ❌ Avoid - multiple responsibilities
function saveAndValidateAndRender() {
    // ...
}
```

#### Pure Functions When Possible
```javascript
// ✅ Good - pure function
function generateInitialPRD() {
    return {
        projectName: state.project.name,
        // ...
    };
}

// ❌ Avoid - side effects
function updateState() {
    state.prd = {}; // Side effect
}
```

### Error Handling
- Validate user input before processing
- Provide meaningful error messages
- Use try-catch for risky operations
- Fail gracefully without crashing

```javascript
function handleProjectSubmit(e) {
    e.preventDefault();
    
    const name = projectName.value.trim();
    const idea = projectIdea.value.trim();
    
    if (!name || !idea) {
        alert('Please fill in all fields');
        return;
    }
    
    // Process...
}
```

### State Management
- Keep state in a single source of truth
- Immutable updates when possible
- Always save state after changes
- Clear separation between state and UI

```javascript
const state = {
    project: null,
    messages: [],
    prd: null
};

// When updating:
state.messages.push(newMessage);
saveState(); // Always persist
renderMessages(); // Update UI
```

## HTML Standards

### Semantic Markup
- Use semantic HTML5 elements
  ```html
  <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
  ```
  
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Use form elements correctly (label, input, textarea, button)

### IDs & Classes
- Use meaningful IDs for JavaScript targeting
- Use classes for styling
- Prefix related elements
  ```html
  <!-- Good -->
  <div id="chatMessages" class="chat-messages"></div>
  <textarea id="userMessage" class="message-input"></textarea>
  
  <!-- Avoid -->
  <div id="c1" class="m"></div>
  <textarea id="i" class="x"></textarea>
  ```

### Accessibility
- Include alt text for all images
- Use labels with form inputs
- Ensure proper color contrast
- Support keyboard navigation

```html
<!-- Good -->
<label for="projectName">Project Name</label>
<input type="text" id="projectName" required>

<!-- Avoid -->
<input type="text" placeholder="Name">
```

## CSS Standards

### Organization
- Group related styles together
- Use consistent spacing and formatting
- Keep selectors simple and specific
- Avoid deep nesting

```css
/* ✅ Good - organized, clear hierarchy */
.message {
    display: flex;
    gap: 10px;
}

.message.human {
    justify-content: flex-end;
}

.message-content {
    padding: 12px 16px;
}

/* ❌ Avoid - deeply nested */
.workspace .chat .messages .message.human .content {
    /* ... */
}
```

### CSS Variables
- Use CSS custom properties for theming
- Define at root level
- Group related variables

```css
:root {
    /* Colors */
    --primary-color: #2563eb;
    --text-dark: #1e293b;
    
    /* Spacing */
    --spacing-sm: 8px;
    --spacing-md: 16px;
}
```

### Responsive Design
- Mobile-first approach
- Use media queries for breakpoints
- Test on multiple screen sizes

```css
/* Base styles for mobile */
.container {
    flex-direction: column;
}

/* Larger screens */
@media (min-width: 768px) {
    .container {
        flex-direction: row;
    }
}
```

### Naming
- Use BEM (Block, Element, Modifier) for complex components
- Keep class names descriptive

```css
/* ✅ Good */
.btn {}
.btn-primary {}
.btn-primary:hover {}

/* Avoid */
.b {}
.b1 {}
.button_primary {}
```

## Performance Guidelines

### JavaScript
- Avoid unnecessary DOM queries
- Cache DOM references
- Use event delegation when appropriate
- Minimize localStorage operations

```javascript
// ✅ Good - cached reference
const messages = document.getElementById('chatMessages');
messages.innerHTML = content;

// ❌ Avoid - repeated queries
document.getElementById('chatMessages').innerHTML = content;
```

### CSS
- Avoid inline styles in HTML
- Use classes for styling
- Minimize use of !important
- Optimize animations and transitions

## Security

### Input Sanitization
- Always escape user input when rendering HTML
- Use textContent for plain text
- Use innerHTML only for trusted content

```javascript
// ✅ Good - sanitized
div.textContent = userInput;

// ✅ Good - escaped
div.innerHTML = `<p>${escapeHtml(userInput)}</p>`;

// ❌ Avoid - XSS vulnerability
div.innerHTML = `<p>${userInput}</p>`;
```

### Data Handling
- No sensitive data in localStorage
- Use HTTPS for any external requests
- Validate all user input

## Testing & Quality

### Browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Test responsive design on mobile devices
- Test keyboard navigation
- Verify accessibility with screen readers

### Code Quality
- Use consistent formatting
- No unused variables or functions
- No console errors or warnings
- Keep functions under 50 lines when possible

## Git & Version Control

### Commits
- Write clear, descriptive commit messages
- Keep commits focused on single features
- Use present tense: "Add feature" not "Added feature"

### Branch Naming
- Use feature branches for new work
- Use descriptive names: `feature/chat-panel`, `fix/export-bug`

## Documentation

### README
- Keep up-to-date with current status
- Document setup and running instructions
- List main features and structure
- Add usage examples

### Code Comments
- Explain "why" not "what" (code shows what)
- Keep comments concise and accurate
- Update comments when code changes

## Tools & Setup

### Local Development
- Use simple HTTP server for development
- No build step required
- Pure HTML/CSS/JavaScript

### Browser DevTools
- Use for debugging and testing
- Check console for errors
- Profile performance if needed

## Review Checklist

Before considering code complete:
- [ ] Code follows naming conventions
- [ ] Functions have clear purpose
- [ ] User input is validated
- [ ] Data is properly persisted
- [ ] UI renders correctly
- [ ] Mobile responsive
- [ ] Accessibility considered
- [ ] No console errors
- [ ] Comments explain complex logic
- [ ] HTML is semantic
- [ ] CSS is organized
