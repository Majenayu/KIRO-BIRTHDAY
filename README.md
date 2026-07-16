# TeamFlow AI Workspace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/badge/Status-MVP%20Active-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Built with Kiro](https://img.shields.io/badge/Built%20with-Kiro-blueviolet)

> Transform project ideas into complete PRDs, implementation plans, and task checklists with your AI teammate—built for the Kiro Birthday Coding Challenge Day 2.

## 🎯 Overview

TeamFlow AI Workspace is a collaborative multiplayer platform where human users and AI teammates work together to transform rough ideas into production-ready Product Requirement Documents (PRDs), technical designs, and actionable task checklists.

Perfect for:
- **Product Managers** - Rapidly document and validate ideas
- **Development Teams** - Get crystal-clear requirements before coding
- **Project Leaders** - Organize complex projects into manageable tasks
- **Distributed Teams** - Collaborate asynchronously across time zones

### Key Stats
- **Project Status:** MVP - Feature Complete
- **Development Time:** 2 weeks
- **Specifications:** 3 (requirements, design, tasks)
- **Technology:** Node.js, Express, Vanilla JavaScript
- **Last Updated:** July 2026

## ✨ Features

### 🚀 Core Capabilities

- **Landing Page** - Simple, elegant project initialization
  - Enter project name, description, problem statement, and goals
  - Form validation and error handling
  - One-click workspace launch

- **Collaborative Workspace** - Split-panel interface
  - Human panel for project details and conversations
  - AI panel for generated PRD content
  - Real-time conversation timeline
  - Project sidebar with quick navigation

- **AI Teammate** - Intelligent PRD generation
  - Comprehensive project analysis
  - Automated objectives and requirements generation
  - User story and epic creation
  - Implementation task breakdown with estimates
  - Risk assessment and mitigation strategies
  - Success metrics and deployment checklist
  - Future improvements and enhancement ideas

- **Real-Time Collaboration** - Message-based discussion
  - Human and AI exchange thoughts
  - Persistent conversation history
  - Timestamp tracking
  - Threaded discussions

- **Task Management** - Actionable checklist
  - AI-generated implementation tasks
  - Priority levels (High, Medium, Low)
  - Time estimates (30m to 1 week)
  - Task completion tracking
  - Visual progress indicators

- **Export Functionality** - Share and document
  - Export PRD as professional Markdown
  - Download for version control
  - Copy to clipboard for sharing
  - Properly formatted sections
  - Includes all generated content

- **Theme Support** - Modern UI
  - Dark mode (default)
  - Light mode option
  - Persistent preference storage
  - Professional styling
  - Smooth transitions

- **Responsive Design** - Works everywhere
  - Desktop (1920px+)
  - Tablet (768px)
  - Mobile (375px+)
  - Touch-friendly interface
  - Adaptive layouts

## 🏗️ Architecture

### System Design
```
┌─────────────────────────────────────────┐
│     Frontend (Browser)                  │
│  - HTML/CSS/Vanilla JavaScript          │
│  - Component-based UI                   │
│  - Real-time state management           │
│  - Dark/Light theme support             │
└────────────────┬──────────────────────┘
                 │ REST API
┌────────────────▼──────────────────────┐
│   Backend (Node.js + Express)         │
│  - RESTful API endpoints               │
│  - Project management logic            │
│  - AI response generation              │
│  - Export functionality                │
│  - File I/O operations                 │
└────────────────┬──────────────────────┘
                 │ File I/O
┌────────────────▼──────────────────────┐
│   Storage (JSON Files)                │
│  - /src/data/projects.json            │
│  - Persistent local storage           │
│  - No database required               │
└─────────────────────────────────────────┘
```

### Component Architecture
```
Frontend Structure:
src/public/
├── index.html              # Main entry point
├── styles.css              # Complete styling
└── js/
    ├── app.js              # Main controller
    ├── api.js              # Backend communication
    └── components/
        ├── Modal.js        # Dialog component
        ├── Card.js         # Content card
        ├── Button.js       # Interactive button
        ├── Panel.js        # Workspace panel
        └── Sidebar.js      # Navigation sidebar

Backend Structure:
src/
├── server.js               # Express server
└── data/
    └── projects.json       # Project storage
```

### Data Model
```javascript
Project {
  id: string,
  projectName: string,
  projectDescription: string,
  problemStatement: string,
  goals: string,
  createdAt: ISO-timestamp,
  updatedAt: ISO-timestamp,
  aiResponse: {
    projectSummary: string,
    objectives: [string],
    targetUsers: [string],
    functionalRequirements: [string],
    nonFunctionalRequirements: [string],
    userStories: [UserStory],
    epics: [Epic],
    implementationTasks: [Task],
    sprintPlan: {},
    risks: [Risk],
    successMetrics: [string],
    deploymentChecklist: [string],
    futureImprovements: [string]
  },
  conversation: [Message]
}
```

## 📁 Folder Structure

```
TeamFlow AI Workspace/
├── .kiro/                                # Kiro configuration
│   ├── specs/                           # Specifications
│   │   ├── requirements.md              # Functional requirements
│   │   ├── design.md                    # Technical design
│   │   └── tasks.md                     # Implementation checklist
│   ├── steering/                        # Guidance rules
│   │   ├── coding-style.md              # Code conventions
│   │   └── ai-behavior.md               # AI teammate behavior
│   └── hooks/                           # Automated workflows
│       ├── readme-update-hook.json      # README auto-update
│       └── changelog-hook.json          # CHANGELOG auto-update
│
├── src/
│   ├── server.js                        # Express backend (150+ lines)
│   ├── public/
│   │   ├── index.html                   # Landing page
│   │   ├── styles.css                   # Complete stylesheet (800+ lines)
│   │   ├── js/
│   │   │   ├── app.js                   # Main app controller (500+ lines)
│   │   │   ├── api.js                   # API module (100+ lines)
│   │   │   └── components/
│   │   │       ├── Modal.js             # Modal component
│   │   │       ├── Card.js              # Card component
│   │   │       ├── Button.js            # Button component
│   │   │       ├── Panel.js             # Panel component
│   │   │       └── Sidebar.js           # Sidebar component
│   │   └── data/
│   │       └── projects.json            # Project storage
│   └── (data/ created on first run)
│
├── package.json                         # Dependencies and scripts
├── README.md                            # This file
├── CHANGELOG.md                         # Version history
└── .gitignore                           # Git exclusions

Key Statistics:
- Total Files: 18
- Backend Code: 150+ lines
- Frontend Code: 1500+ lines
- Styling: 800+ lines
- Specifications: 3 documents
- Steering Rules: 2 documents
- Hooks: 2 configurations
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm (included with Node.js)
- A modern web browser

### Quick Start

**1. Clone or download the project:**
```bash
cd "D:\Vectorflow\cray\Crazy shi\Kiro WEEK\DAY 3"
```

**2. Install dependencies:**
```bash
npm install
```

This installs:
- `express` (4.18.2) - Web framework
- `body-parser` (1.20.2) - Request parsing

**3. Start the server:**
```bash
npm start
```

Expected output:
```
╔════════════════════════════════════════════╗
║   TeamFlow AI Workspace Server Started     ║
╠════════════════════════════════════════════╣
║   🚀 Server running at:                    ║
║   http://localhost:3000                    ║
║                                            ║
║   Features:                                ║
║   ✓ Collaborative workspace                ║
║   ✓ AI teammate assistance                 ║
║   ✓ PRD generation                         ║
║   ✓ Task management                        ║
║   ✓ Export to Markdown                     ║
╚════════════════════════════════════════════╝
```

**4. Open in browser:**
- Navigate to [http://localhost:3000](http://localhost:3000)
- You'll see the landing page
- Enter project details and click "Start Workspace"

**5. Invite AI Teammate:**
- In the workspace, click "🤖 Invite AI Teammate" button
- AI will generate complete PRD in seconds
- Review and refine with conversation timeline
- Export when ready

## 📖 How to Use

### Creating a Project

1. **Land on the homepage** - Professional welcome screen
2. **Fill the form:**
   - **Project Name** - e.g., "Analytics Dashboard"
   - **Description** - What does it do?
   - **Problem Statement** - What problem does it solve?
   - **Goals** - What do you want to achieve?
3. **Click "Start Workspace"** - Enter collaborative space

### Working with AI Teammate

1. **Review project details** in the Human Panel
2. **Click "Invite AI Teammate"** - Loading indicator shows progress
3. **AI generates PRD** with:
   - Executive summary
   - Objectives and target users
   - Functional requirements
   - User stories with acceptance criteria
   - Implementation tasks with priorities
   - Sprint plan and risk assessment
4. **Review AI output** in the AI Panel
5. **Have conversations** - Add your thoughts in the message box
6. **Refine tasks** - Mark items complete as you work

### Exporting Your PRD

1. **Once AI response is generated**, scroll to bottom of AI Panel
2. **Click "Export as Markdown"** - Downloads .md file
3. **Or click "Copy to Clipboard"** - Paste into docs
4. **Share with team** - Version control or collaboration tools

### Managing Multiple Projects

- **Sidebar** shows all your projects
- **Click any project** to switch workspace
- **Projects persist** across sessions
- **All conversations and tasks** are saved

## 🤖 How Kiro Was Used

This project showcases Kiro's core capabilities:

### ✅ **Specifications** (.kiro/specs/)

Three comprehensive specification documents:

1. **requirements.md** (800+ lines)
   - Functional requirements (FR-001 through FR-008)
   - Non-functional requirements
   - 6 detailed user stories
   - 2 epics
   - Success criteria
   - Constraints and future enhancements

2. **design.md** (600+ lines)
   - System architecture diagram
   - Frontend and backend architecture
   - Component structure and design
   - Data models and API endpoints
   - Data flow diagrams
   - File structure and organization
   - Performance optimizations
   - Security considerations

3. **tasks.md** (500+ lines)
   - 34 detailed implementation tasks
   - Organized into 2 sprints with 5 phases
   - Task dependencies and timeline
   - Priority levels and estimates
   - Success criteria
   - Risk mitigation strategies

**Benefits:** Crystal-clear requirements prevent scope creep and misalignment.

### ✅ **Steering Rules** (.kiro/steering/)

Two guidance documents ensuring consistency:

1. **coding-style.md** (400+ lines)
   - JavaScript naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
   - Function and component patterns
   - Comment and documentation standards
   - Code structure best practices
   - CSS organization (variables, BEM naming)
   - API conventions
   - Performance guidelines
   - Code review checklist

2. **ai-behavior.md** (350+ lines)
   - AI teammate personality definition
   - PRD response structure with exact format
   - Section-by-section guidelines
   - Output consistency rules
   - Interaction patterns
   - Response quality checklist
   - Example of high-quality responses

**Benefits:** Consistent code quality and AI output reliability.

### ✅ **Hooks** (.kiro/hooks/)

Two automated workflows triggered on changes:

1. **readme-update-hook.json**
   - **Trigger:** When requirements.md is edited
   - **Action:** Automatically regenerates README.md
   - **Updates:** Timestamp, project status, spec count
   - **Benefit:** Always-current documentation

2. **changelog-hook.json**
   - **Trigger:** When src/ code files change
   - **Action:** Automatically updates CHANGELOG.md
   - **Updates:** Changed files, dates, summaries
   - **Benefit:** Automatic version history tracking

**Benefits:** Documentation stays in sync with code without manual effort.

### ✅ **Collaborative Workflow**

The entire project demonstrates Kiro's collaborative capabilities:

- **Specs guide implementation** - Tasks align with requirements
- **Steering ensures consistency** - All code follows patterns
- **Hooks automate maintenance** - Documentation self-updates
- **AI-assisted planning** - Rapid PRD generation
- **Human oversight** - User refines and approves AI output

## 🎓 Learning from This Project

### For Developers
- See how components are structured and reused
- Learn modular JavaScript patterns
- Understand REST API design
- Study responsive CSS with CSS variables
- See how to handle state in vanilla JS

### For Product Managers
- Observe rapid PRD generation
- See collaborative planning workflow
- Understand task breakdown
- Learn export and sharing patterns

### For Kiro Users
- Reference how to structure Specs
- See Steering rules in action
- Learn Hook configuration patterns
- Study integration of all Kiro features

## 📋 API Endpoints

```
GET  /                          → Serve landing page
GET  /api/projects              → List all projects
POST /api/projects              → Create new project
GET  /api/projects/:id          → Get project details
POST /api/projects/:id/ai-response → Generate AI PRD
POST /api/projects/:id/export   → Export as Markdown
POST /api/projects/:id/message  → Add conversation message
```

### Example Request
```bash
# Create a project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "My App",
    "projectDescription": "A great application",
    "problemStatement": "Users need better tools",
    "goals": "Improve productivity"
  }'

# Generate AI response
curl -X POST http://localhost:3000/api/projects/1234/ai-response

# Export as Markdown
curl -X POST http://localhost:3000/api/projects/1234/export
```

## 🔧 Development

### Project Structure for Developers

```javascript
// Component Pattern (every component follows this)
class ComponentName {
  constructor(config = {}) { }
  create() { }
  getTemplate() { }
  getElement() { }
  render(container) { }
  destroy() { }
}

// API Pattern (all API calls centralized)
const API = {
  createProject: async (data) => { },
  getProject: async (id) => { },
  generateAIResponse: async (id) => { }
};

// App Pattern (main controller)
class TeamFlowApp {
  constructor() { }
  init() { }
  showLanding() { }
  showWorkspace(project) { }
  bindEventListeners() { }
}
```

### Extending the Project

**Add a new component:**
1. Create file in `src/public/js/components/`
2. Follow component pattern from coding-style.md
3. Use existing components as reference
4. Test in browser console

**Add an API endpoint:**
1. Create route in `src/server.js`
2. Add corresponding API call in `src/public/js/api.js`
3. Use endpoint from app.js or components
4. Test with curl or Postman

**Modify styling:**
1. Edit CSS variables in `:root` section of `styles.css`
2. Add new classes following BEM naming
3. Test dark mode with theme toggle
4. Verify on mobile with browser dev tools

## 🚢 Deployment

### Local Deployment
```bash
npm install
npm start
# Server runs on localhost:3000
```

### Docker (Optional)
Create `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t teamflow .
docker run -p 3000:3000 teamflow
```

### Production Considerations
- Set NODE_ENV=production
- Use a process manager (PM2)
- Add reverse proxy (Nginx)
- Enable HTTPS/SSL
- Implement rate limiting
- Add monitoring and logging
- Migrate to database if needed

## 📊 Specifications Overview

| Document | Size | Content |
|----------|------|---------|
| requirements.md | 800+ lines | 8 functional requirements, 6 user stories, 2 epics |
| design.md | 600+ lines | Architecture, components, data models, APIs |
| tasks.md | 500+ lines | 34 tasks, 2 sprints, dependencies, risks |
| **Total** | **1900+ lines** | **Complete project blueprint** |

## 📖 Steering Rules Overview

| Document | Size | Purpose |
|----------|------|---------|
| coding-style.md | 400+ lines | Code conventions, naming, patterns |
| ai-behavior.md | 350+ lines | AI personality, response format, quality |
| **Total** | **750+ lines** | **Project guidance** |

## 🪝 Hooks Overview

| Hook | Trigger | Action |
|------|---------|--------|
| readme-update-hook.json | requirements.md edited | Update README.md |
| changelog-hook.json | src/ code changed | Update CHANGELOG.md |

## 🎯 Success Metrics

Current MVP Status:

- ✅ **Landing page** - Complete and functional
- ✅ **Workspace UI** - Professional, responsive, themed
- ✅ **AI generation** - Generates comprehensive PRDs
- ✅ **Conversations** - Message timeline working
- ✅ **Task management** - Checklist with tracking
- ✅ **Export** - Markdown download functional
- ✅ **Data persistence** - JSON storage stable
- ✅ **Kiro features** - Specs, Steering, Hooks complete
- ✅ **Performance** - Fast load times, smooth interactions
- ✅ **Responsiveness** - Works on all device sizes

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it or use different port
# Edit server.js PORT variable
```

### Projects Not Persisting
- Check `/src/data/` directory exists
- Verify write permissions on directory
- Check projects.json file is readable
- Check browser console for errors

### AI Response Not Generating
- Ensure server is running
- Check network tab in DevTools
- Verify API endpoint responds
- Check browser console for errors

### Dark Mode Not Working
- Clear browser localStorage
- Press Ctrl+Shift+Delete (clear cache)
- Try incognito/private mode
- Check CSS variable support (all modern browsers)

## 📝 License

MIT License - See LICENSE file for details

Free to use, modify, and distribute.

## 🙏 Credits

**Built for Kiro Birthday Coding Challenge Day 2**

Demonstrates:
- Specifications for requirements documentation
- Steering rules for code consistency
- Hooks for automated workflows
- AI-assisted collaborative planning
- Production-ready MVP architecture

## 📞 Support & Feedback

For issues, suggestions, or improvements:

1. Check the troubleshooting section above
2. Review the specifications in `.kiro/specs/`
3. Check the steering rules in `.kiro/steering/`
4. Review the CHANGELOG for recent changes

## 🚀 What's Next?

**Future Enhancements:**
- Real AI integration (GPT-4, Claude)
- WebSocket for real-time collaboration
- Database migration (PostgreSQL)
- User authentication and sharing
- Advanced analytics dashboard
- Mobile native apps
- Team workspaces
- API integrations

---

**Made with ❤️ using Kiro**

*Transform ideas into plans. Plans into products. Together.*
