# ATS Resume Checklist Generator - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         React Frontend (localhost:3000)                  │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                            │   │
│  │  ┌─ App.js (Main Component)                             │   │
│  │  │  ├─ JobDescriptionInput (User Input)                │   │
│  │  │  │  └─ TextArea + Button                           │   │
│  │  │  └─ ChecklistResult (Display Results)              │   │
│  │  │     ├─ SkillsSection                               │   │
│  │  │     ├─ ResponsibilitiesSection                     │   │
│  │  │     ├─ ExperienceEducationSection                 │   │
│  │  │     └─ ATSTipsSection                             │   │
│  │  │                                                      │   │
│  │  └─ Axios (HTTP Client)                               │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         ▲                                         │
│                         │                                         │
│         HTTP (POST /api/analyze)                                 │
│                         │                                         │
│                         ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Express.js Backend (localhost:5000)              │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                            │   │
│  │  ┌─ server.js (HTTP Server)                             │   │
│  │  │  ├─ GET /api/health (Health Check)                 │   │
│  │  │  └─ POST /api/analyze (Main Endpoint)              │   │
│  │  │     │                                                │   │
│  │  │     └─► analyzer.js (Processing)                   │   │
│  │  │        ├─ extractKeywords()                        │   │
│  │  │        ├─ extractResponsibilities()                │   │
│  │  │        ├─ extractExperienceRequirements()          │   │
│  │  │        ├─ extractEducationRequirements()           │   │
│  │  │        └─ generateATSTips()                        │   │
│  │  │                                                      │   │
│  │  └─ Returns JSON Response                              │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Request/Response Flow

```
1. USER ACTION
   └─ Pastes job description
   └─ Clicks "Generate Checklist"

2. FRONTEND (React)
   └─ JobDescriptionInput validates input
   └─ Shows loading spinner
   └─ Axios sends POST request with job description

3. HTTP TRANSMISSION
   └─ Network request to POST /api/analyze
   └─ JSON payload: {jobDescription: "..."}

4. BACKEND (Express)
   └─ Receives request
   └─ Validates job description
   └─ Calls analyzer.generateChecklist()

5. ANALYSIS (analyzer.js)
   ├─ extractKeywords() → Find technical terms
   ├─ extractResponsibilities() → Find duties
   ├─ extractExperienceRequirements() → Find years
   ├─ extractEducationRequirements() → Find education
   ├─ Compile keywords
   └─ generateATSTips() → Create recommendations

6. RESPONSE
   └─ Backend returns JSON:
      {
        success: true,
        checklist: {...},
        timestamp: "2024-01-15..."
      }

7. FRONTEND DISPLAY
   └─ ChecklistResult component receives data
   └─ Renders 5 main sections:
      ├─ Skills Section
      ├─ Experience & Education
      ├─ Responsibilities
      ├─ Keywords
      └─ ATS Tips

8. USER INTERACTION
   └─ Expand/collapse sections
   └─ Check items as completed
   └─ Download or copy checklist
```

## Component Architecture

```
┌─ App (Main)
│  ├─ State: jobDescription, checklist, loading, error
│  ├─ Handle: Analyze button click
│  ├─ Manage: API communication
│  │
│  └─ Routes to:
│     ├─ JobDescriptionInput (Before analysis)
│     │  ├─ State: char count
│     │  ├─ Props: jobDescription, setters, handlers
│     │  └─ Features: Textarea, counter, tips, example
│     │
│     └─ ChecklistResult (After analysis)
│        ├─ State: expandedSections, checkedItems
│        ├─ Props: checklist, jobDescription, onReset
│        ├─ Contains:
│        │  ├─ SkillsSection
│        │  │  └─ Props: skills, isExpanded, onToggle
│        │  ├─ ExperienceEducationSection
│        │  │  └─ Props: experience, education, isExpanded, onToggle
│        │  ├─ ResponsibilitiesSection
│        │  │  └─ Props: responsibilities, keywords, isExpanded, onToggle
│        │  └─ ATSTipsSection
│        │     └─ Props: tips, isExpanded, onToggle
│        └─ Features: Progress bar, download, copy, export
```

## Data Model

```
ChecklistResult = {
  technical_skills: [
    {
      category: string,
      skills: [string],
      count: number
    }
  ],
  experience_level: {
    minYears: number | null,
    mentioned: boolean
  },
  education: [string],
  responsibilities: [string],
  keywords: [string],
  ats_tips: [
    {
      id: string,
      priority: "HIGH" | "MEDIUM",
      title: string,
      description: string,
      action: string
    }
  ]
}
```

## Database Schema (if extended)

```
┌─────────────────────────────────────┐
│  Users                              │
├─────────────────────────────────────┤
│ id (PK)                             │
│ email                               │
│ password_hash                       │
│ created_at                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  JobAnalyses                        │
├─────────────────────────────────────┤
│ id (PK)                             │
│ user_id (FK)                        │
│ job_description                     │
│ checklist (JSON)                    │
│ created_at                          │
│ updated_at                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  SavedChecklists                    │
├─────────────────────────────────────┤
│ id (PK)                             │
│ user_id (FK)                        │
│ job_analysis_id (FK)                │
│ completion_status (JSON)            │
│ created_at                          │
└─────────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────┐
│    FRONTEND         │
├─────────────────────┤
│ React 18            │
│ JavaScript/ES6      │
│ CSS3                │
│ Axios               │
│ React Scripts       │
└─────────────────────┘

┌─────────────────────┐
│     BACKEND         │
├─────────────────────┤
│ Node.js             │
│ Express 4.x         │
│ JavaScript/ES6      │
│ CORS                │
│ Body Parser         │
└─────────────────────┘

┌─────────────────────┐
│  INFRASTRUCTURE     │
├─────────────────────┤
│ npm (Package Mgr)   │
│ Git (Version Ctrl)  │
│ localhost           │
│ HTTP/REST API       │
└─────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     PRODUCTION                           │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─ Frontend Hosting (Vercel/Netlify)                  │
│  │  └─ React Build → Static files                       │
│  │                                                        │
│  ├─ API Gateway / Load Balancer                        │
│  │  └─ Route /api/analyze → Backend                    │
│  │                                                        │
│  └─ Backend Server (Heroku/EC2)                        │
│     └─ Node.js + Express                               │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌────────────────────────────────────────────┐
│            SECURITY LAYERS                 │
├────────────────────────────────────────────┤
│                                             │
│  1. FRONTEND                               │
│     ├─ Input validation                   │
│     ├─ XSS protection (React)             │
│     └─ Secure HTTP (HTTPS)                │
│                                             │
│  2. NETWORK                                │
│     ├─ CORS (Cross-Origin)                │
│     └─ HTTPS encryption                   │
│                                             │
│  3. BACKEND                                │
│     ├─ Input validation                   │
│     ├─ Error handling                     │
│     ├─ Environment variables              │
│     └─ Rate limiting (future)             │
│                                             │
│  4. DATA                                   │
│     ├─ No sensitive storage               │
│     ├─ Session-based only                 │
│     └─ Privacy-first design               │
│                                             │
└────────────────────────────────────────────┘
```

## Error Handling Flow

```
┌─ User Input Error (Empty)
│  └─ Frontend validation
│     └─ Display: "Please enter a job description"

├─ Network Error
│  └─ Axios catch
│     └─ Display: "Failed to connect to server"

├─ Server Error (500)
│  └─ Backend try-catch
│     └─ Return: {success: false, error: "..."}
│        └─ Frontend displays error message

└─ Invalid Response
   └─ Frontend validation
      └─ Fallback: Show generic error
```

## Performance Optimization

```
┌──────────────────────────────────────┐
│     OPTIMIZATION STRATEGIES          │
├──────────────────────────────────────┤
│                                       │
│  Frontend:                           │
│  • Component memoization             │
│  • Lazy loading (future)             │
│  • CSS minification                  │
│  • Build optimization                │
│                                       │
│  Backend:                            │
│  • Efficient regex patterns          │
│  • String search optimization        │
│  • Response caching (future)         │
│  • Database indexing (future)        │
│                                       │
│  Network:                            │
│  • Gzip compression                  │
│  • JSON optimization                 │
│  • Keep-alive connections            │
│                                       │
└──────────────────────────────────────┘
```

## Scalability Plan

```
Phase 1: Current
├─ Single frontend instance
├─ Single backend instance
└─ No persistence

Phase 2: With Database
├─ User authentication
├─ Saved checklists
├─ History tracking
└─ Database (PostgreSQL/MongoDB)

Phase 3: Distributed
├─ Load balancing
├─ Multiple backend instances
├─ Caching layer (Redis)
├─ CDN for frontend
└─ Microservices (future)

Phase 4: Advanced
├─ Machine learning models
├─ Real-time collaboration
├─ Mobile app
├─ API for third parties
└─ Analytics dashboard
```

## CI/CD Pipeline (if implemented)

```
┌─────────────────────────────────────┐
│      GIT PUSH TO MAIN               │
└────────────────┬────────────────────┘
                 │
         ┌───────▼────────┐
         │  GITHUB ACTIONS│
         └────────┬────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
 LINT/         BUILD         TEST
 FORMAT       FRONTEND       SUITE
    │             │             │
    └─────────────┼─────────────┘
                  │
        ┌─────────▼──────────┐
        │ BUILD BACKEND      │
        └─────────┬──────────┘
                  │
        ┌─────────▼──────────┐
        │ DEPLOY STAGING     │
        └─────────┬──────────┘
                  │
        ┌─────────▼──────────┐
        │ SMOKE TESTS        │
        └─────────┬──────────┘
                  │
        ┌─────────▼──────────┐
        │ DEPLOY PRODUCTION  │
        └────────────────────┘
```

---

## Summary

**Key Architectural Principles:**
1. **Separation of Concerns** - Frontend and Backend are separate
2. **REST API** - Standard HTTP methods for communication
3. **Stateless** - No server session storage
4. **Scalable** - Easy to add features and scale
5. **Maintainable** - Clear structure and documentation
6. **Secure** - Privacy-first, no data retention
7. **Simple** - Minimal dependencies, easy to understand

**Future Enhancements:**
- Database integration for persistence
- User authentication and profiles
- Advanced caching strategies
- Machine learning improvements
- Mobile app
- Real-time collaboration
