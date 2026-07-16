# TeamFlow AI Workspace - Technical Design

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Architecture:** Client-Server with JSON Storage

## System Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (Browser)              │
│  - HTML/CSS/Vanilla JavaScript          │
│  - Component-based architecture         │
│  - Dark mode support                    │
│  - Responsive layout                    │
└────────────────┬──────────────────────┘
                 │ HTTP/REST
┌────────────────▼──────────────────────┐
│     Backend (Node.js + Express)       │
│  - REST API endpoints                 │
│  - Project management                 │
│  - AI response generation             │
│  - Export functionality               │
└────────────────┬──────────────────────┘
                 │ File I/O
┌────────────────▼──────────────────────┐
│   Storage (JSON Files)                │
│  - /src/data/projects.json            │
│  - Persistent data storage            │
└─────────────────────────────────────────┘
```

## Frontend Architecture

### Component Structure

```
App (main controller)
├── Sidebar
│   └── Project list
├── Navbar
│   ├── Project title
│   └── Theme toggle
└── Workspace
    ├── Human Panel
    │   ├── Project details
    │   ├── Conversation
    │   └── Controls
    └── AI Panel
        ├── Summary
        ├── Requirements
        ├── Tasks
        └── Export options
```

### Component Classes

**Modal**
- Reusable dialog component
- Show/hide functionality
- Overlay click to close
- Custom content support

**Card**
- Content container with header/body/footer
- Hover effects
- Flexible styling
- Click handlers

**Button**
- Multiple variants (primary, secondary, success, outline)
- Loading state support
- Size options (sm, md, lg)
- Disabled state

**Panel**
- Workspace section with header and content
- Dynamic content updates
- Footer support
- Scrollable content area

**Sidebar**
- Project navigation
- Active project highlighting
- Project list rendering
- Selection callbacks

### API Module

Handles all backend communication:
- `createProject(data)` - Create new project
- `getProjects()` - Fetch all projects
- `getProject(id)` - Get specific project
- `generateAIResponse(id)` - Generate PRD
- `exportProject(id)` - Export as Markdown
- `addMessage(id, speaker, message)` - Add conversation

## Backend Architecture

### Express Server

**Endpoints:**

```
GET  /                           → Serve landing page
GET  /api/projects               → List all projects
POST /api/projects               → Create new project
GET  /api/projects/:id           → Get project details
POST /api/projects/:id/ai-response → Generate AI response
POST /api/projects/:id/export    → Export as Markdown
POST /api/projects/:id/message   → Add message
```

### Data Model

**Project Object:**
```javascript
{
  id: "timestamp-based-id",
  projectName: "string",
  projectDescription: "string",
  problemStatement: "string",
  goals: "string",
  createdAt: "ISO-timestamp",
  updatedAt: "ISO-timestamp",
  aiResponse: {
    projectSummary: "string",
    objectives: ["string"],
    targetUsers: ["string"],
    functionalRequirements: ["string"],
    nonFunctionalRequirements: ["string"],
    userStories: [{id, title, description, criteria}],
    epics: [{id, title, description}],
    implementationTasks: [{id, title, priority, estimate}],
    sprintPlan: {sprint1, sprint2},
    risks: [{id, description, severity}],
    successMetrics: ["string"],
    deploymentChecklist: ["string"],
    futureImprovements: ["string"]
  },
  conversation: [
    {id, speaker, message, timestamp}
  ]
}
```

### AI Response Generation

The server includes a `generateAIResponse()` function that simulates AI analysis:
- Analyzes project inputs
- Generates comprehensive PRD structure
- Creates user stories and epics
- Generates implementation tasks
- Includes risk assessment
- Provides success metrics

## Data Flow

### Project Creation Flow
```
1. User enters project details on landing page
2. Submit → POST /api/projects
3. Server creates project object with unique ID
4. Project saved to JSON storage
5. Client receives project data
6. App navigates to workspace with new project
```

### AI Response Generation Flow
```
1. User clicks "Invite AI Teammate"
2. Client calls POST /api/projects/:id/ai-response
3. Server generates comprehensive AI response
4. Response data saved to project
5. Client receives response data
6. AI Panel updates with generated content
7. Export options become available
```

### Export Flow
```
1. User clicks "Export as Markdown"
2. Client calls POST /api/projects/:id/export
3. Server formats project data as Markdown
4. Response includes markdown content and filename
5. Client creates blob and triggers download
6. Browser downloads .md file
```

## File Structure

```
TeamFlow AI Workspace/
├── .kiro/
│   ├── specs/
│   │   ├── requirements.md
│   │   ├── design.md
│   │   └── tasks.md
│   ├── steering/
│   │   ├── coding-style.md
│   │   └── ai-behavior.md
│   └── hooks/
│       ├── readme-update-hook.json
│       └── changelog-hook.json
├── src/
│   ├── public/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── api.js
│   │   │   └── components/
│   │   │       ├── Modal.js
│   │   │       ├── Card.js
│   │   │       ├── Button.js
│   │   │       ├── Panel.js
│   │   │       └── Sidebar.js
│   │   └── data/
│   │       └── projects.json
│   └── server.js
├── package.json
├── README.md
└── CHANGELOG.md
```

## Styling Architecture

### CSS Variables
- Color system (primary, secondary, success, danger)
- Dark/Light mode themes
- Spacing scale (xs, sm, md, lg, xl, 2xl)
- Typography scale
- Border radius scale
- Transitions and animations

### Component Styling
- Card components with hover effects
- Button variants and states
- Panel layouts with flexbox
- Responsive grid system
- Dark mode support throughout

### Responsive Design
- Mobile-first approach
- Tablet breakpoint (768px)
- Desktop breakpoint (1024px)
- Sidebar collapsible on mobile
- Stacked panels on smaller screens

## State Management

### Application State
```javascript
app.currentProject        // Active project object
app.projects             // Array of all projects
app.darkMode             // Theme preference
app.sidebar              // Sidebar component instance
app.humanPanel           // Human panel component instance
app.aiPanel              // AI panel component instance
```

### Component State
- Modal: open/close state
- Button: loading/disabled states
- Sidebar: active project ID
- Panel: content visibility

### Persistence
- localStorage: Dark mode preference
- Server JSON: All project data
- Session: Current active project

## Security Considerations

1. **Input Validation**
   - Form fields validated before submission
   - API validates all inputs

2. **Data Sanitization**
   - HTML content escaped in display
   - No eval() or dynamic code execution

3. **Error Handling**
   - Try-catch blocks around API calls
   - User-friendly error messages
   - Console logging for debugging

4. **CORS**
   - Proper headers configuration
   - Restrict to same-origin by default

## Performance Optimizations

1. **Frontend**
   - Vanilla JavaScript (no framework overhead)
   - Modular component loading
   - CSS transitions instead of JS animations
   - Event delegation for dynamic elements

2. **Backend**
   - Synchronous JSON I/O (acceptable for MVP)
   - No database query optimization needed
   - Response caching at application level

3. **Network**
   - Minimal HTTP requests
   - Single CSS file
   - Combined JavaScript bundle
   - Gzip compression via Express

## Deployment Architecture

```
Local Development:
npm install
npm start
→ Server runs on localhost:3000

Production Ready:
- Dockerfile-ready structure
- Environment-aware configuration
- Health check endpoints
- Error logging
```

## Technology Stack Justification

- **Express.js** - Lightweight, perfect for MVP
- **Vanilla JavaScript** - No dependencies, direct browser APIs
- **JSON Storage** - Simple, version-controllable, no setup
- **HTML/CSS** - Modern features, no preprocessors needed
- **CSS Variables** - Theme support without reload

## Future Architecture Evolution

1. **Database Migration**
   - PostgreSQL or MongoDB
   - Prepared statements for security
   - Query optimization

2. **Real-Time Collaboration**
   - WebSocket support
   - Conflict resolution
   - Real-time sync

3. **Microservices**
   - Separate AI service
   - Export service
   - Analytics service

4. **Caching Layer**
   - Redis for performance
   - Session storage

5. **CDN Integration**
   - Static asset distribution
   - Geographic optimization
