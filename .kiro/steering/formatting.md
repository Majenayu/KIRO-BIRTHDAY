# Response Formatting Standards

## Overview

This steering file defines how all outputs should be formatted for consistency, readability, and professionalism. All responses from the AI teammate and system outputs should follow these guidelines.

## PRD Section Formatting

### General Principles
- **Clarity**: Easy to scan and understand
- **Consistency**: Same format for similar content
- **Professionalism**: Appropriate for stakeholder review
- **Completeness**: All necessary information included

### Section Headers
All PRD sections use clear, emoji-prefixed headers:

```
📋 Project Summary
🎯 Objectives
👥 Target Users
✅ Functional Requirements
⚙️ Non-Functional Requirements
📖 User Stories
🔧 Implementation Tasks
⚠️ Potential Risks
📊 Success Metrics
✓ Deployment Checklist
```

### Text Content Formatting

#### Paragraphs
- Single paragraph for Project Summary
- 2-3 sentences per paragraph
- Line breaks between paragraphs for readability
- Avoid walls of text

Good example:
```
This is a clear, concise summary that explains the 
project at a high level. It should be understandable 
to executives and stakeholders.
```

#### Lists
- Use bullet points for unordered information
- Use numbered lists for sequential steps or priorities
- Indent sub-points with consistent spacing
- Keep list items concise

Good bullet list:
```
✓ First requirement
✓ Second requirement
✓ Third requirement
```

Good numbered list:
```
1. First step or phase
2. Second step or phase
3. Third step or phase
```

### Objectives Format

Should be specific, measurable, achievable goals:

```
🎯 Objectives
- Deliver seamless user experience that reduces task time by 40%
- Achieve 95% customer satisfaction within first year
- Support 10,000+ concurrent users without degradation
- Establish market position as category leader within 18 months
```

### Target Users Format

Include role, pain point, and value:

```
👥 Target Users
- Product Managers: Need better collaboration tools to align teams
- Developers: Want streamlined requirement documentation
- Executives: Require clear project roadmaps and KPIs
- Support Teams: Benefit from comprehensive feature documentation
```

### Functional Requirements Format

User-centric, testable statements:

```
✅ Functional Requirements
- Users can create and name new projects
- System auto-saves all work to local storage every 30 seconds
- Users can export PRD as formatted text file
- AI teammate responds to user queries about requirements
- Chat history persists across browser sessions
```

### Non-Functional Requirements Format

Specific, measurable criteria:

```
⚙️ Non-Functional Requirements
- Performance: Initial page load < 1 second
- Availability: 99.5% uptime for application
- Security: All data encrypted in transit and at rest
- Compatibility: Works on Chrome, Firefox, Safari, Edge
- Scalability: Support 100,000 concurrent users
- Accessibility: WCAG 2.1 AA compliance
```

### User Stories Format

Follow standard format with acceptance criteria:

```
📖 User Stories
- As a product manager, I want to quickly generate a PRD so that 
  I can focus on strategy instead of documentation
- As a developer, I want clear functional requirements so that 
  I can estimate work accurately
- As an executive, I want success metrics included so that 
  I can measure ROI
```

### Implementation Tasks Format

Phase-based with clear deliverables:

```
🔧 Implementation Tasks
1. MVP Development (Weeks 1-4)
   - Set up project structure
   - Build home page and workspace UI
   - Implement core chat functionality
   
2. Feature Enhancement (Weeks 5-8)
   - Add export functionality
   - Implement advanced PRD sections
   - Polish UI/UX
   
3. Testing & Deployment (Weeks 9-10)
   - QA testing across browsers
   - Performance optimization
   - Final deployment
```

### Risks & Mitigations Format

Clear risk statement with concrete mitigation:

```
⚠️ Potential Risks

Risk: User adoption slower than projected
Mitigation: Implement user onboarding tutorials and offer early access program

Risk: Performance degradation with large documents
Mitigation: Implement lazy loading and optimize localStorage operations

Risk: Browser compatibility issues
Mitigation: Extensive cross-browser testing and progressive enhancement
```

### Success Metrics Format

Quantifiable KPIs with targets:

```
📊 Success Metrics
- User Acquisition: 1,000 new users in first month
- Engagement: 60% weekly active users
- Retention: 40% month-over-month retention
- Quality: 95% user satisfaction score
- Time Savings: Average 30% reduction in PRD generation time
- NPS: Target Net Promoter Score of 50+
```

### Deployment Checklist Format

Actionable, checkbox-ready items:

```
✓ Deployment Checklist
☐ Code review and approval by lead developer
☐ Automated test suite passes (>80% coverage)
☐ Security audit completed and approved
☐ Performance benchmarks validated
☐ Documentation finalized and reviewed
☐ Stakeholder sign-off obtained
☐ Rollback procedure documented
☐ Monitoring and alerting configured
☐ User documentation prepared
```

## Chat Message Formatting

### User Messages
- Preserve original formatting
- Show timestamp
- Clear visual separation from AI responses
- Distinct background color (light blue)

Display format:
```
👤 You [timestamp]
[User's exact message text]
```

### AI Teammate Messages
- Clear AI identifier
- Thoughtful, well-structured responses
- Use formatting for readability when needed
- Appropriate emoji usage (1-2 max per message)
- Distinct background color (light purple)

Display format:
```
🤖 AI Teammate [timestamp]
[AI response with appropriate formatting]
```

### Message Structure

AI responses should follow this structure:
1. **Acknowledgment**: Show understanding
2. **Action**: Explain what you've done
3. **Verification**: Ask for confirmation
4. **Next Steps**: Suggest what's next

Example:
```
"That's a great point about mobile accessibility! ✅
I've updated the functional requirements to include offline support.
I've also added it to the non-functional requirements around performance.

Does this capture what you were thinking? Should we also consider 
tablet and wearable devices?"
```

## Export Format

### Text File Format

Professional formatting for exported documents:

```
# PRODUCT REQUIREMENT DOCUMENT
# [Project Name]

Generated: [Date and Time]
Project Idea: [Full project idea text]

---

## Project Summary
[Summary text]

## Objectives
[Objectives list]

## Target Users
[Users list]

[... other sections ...]

---
Document generated by TeamFlow AI Workspace
Last updated: [timestamp]
```

## Visual Styling Guide

### Colors & Contrast
- Text: #1e293b (dark slate)
- Backgrounds: #f8fafc (light slate)
- Primary: #2563eb (blue)
- AI message bg: #ede9fe (light purple)
- Human message bg: #dbeafe (light blue)
- Ensure minimum 4.5:1 contrast ratio

### Typography
- Font: System sans-serif stack
- Headings (h4): 1.1rem, bold, primary color
- Body text: 1rem, regular
- Lists: 0.95rem, regular
- Code: Monospace, 0.85rem

### Spacing
- Section padding: 20px
- List item margin: 8px bottom
- Gap between sections: 30px
- Chat message gap: 15px

## Code Formatting

### JavaScript Comments
Use JSDoc format for functions:

```javascript
/**
 * Brief description of what function does
 * @param {type} paramName - Description
 * @returns {type} Description of return
 */
```

### Inline Comments
Explain "why" not "what":

```javascript
// Cache DOM reference to avoid repeated queries
const messages = document.getElementById('chatMessages');
```

### Code Blocks
Use triple backticks with language:

```javascript
const state = {
    project: null,
    messages: [],
    prd: null
};
```

## Special Content Formatting

### Emphasis
- **Bold**: For key terms and important concepts
- *Italic*: For emphasis on phrases
- `Code`: For technical terms and variables

Good example:
```
The **functional requirements** should be **clear and testable**.
Use *snake_case* for variable names in JSON.
The `localStorage` API persists data locally.
```

### Links
Format as markdown:
```
[Link Text](url)
```

Example:
```
See [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
```

## Structured Data Formatting

### Requirement Objects
```
{
  "requirement": "Clear description",
  "priority": "high|medium|low",
  "type": "functional|non-functional"
}
```

### Risk Objects
```
{
  "risk": "Clear risk statement",
  "likelihood": "high|medium|low",
  "impact": "high|medium|low",
  "mitigation": "Concrete mitigation strategy"
}
```

## Responsive Formatting

### Mobile Display
- Stack sections vertically
- Maintain readability on small screens
- Use text wrapping, not horizontal scroll
- Ensure buttons are touch-friendly (minimum 44x44px)

### Desktop Display
- Two-column layout when space permits
- Full-width text with max-width constraint
- Hover states for interactive elements
- Full keyboard navigation support

## Accessibility Formatting

### Color Independence
- Don't rely on color alone to convey information
- Use icons, text, and patterns
- Ensure adequate contrast

### Text Readability
- Line length max 80 characters
- Use 1.5-1.6 line spacing
- Sufficient font size (minimum 14px body text)
- Avoid ALL CAPS except for acronyms

### Form Labels
- Always associate labels with inputs
- Use `<label for="id">` pattern
- Clear, descriptive text

## Emoji Usage Guidelines

### Approved Emojis for PRD Sections
- 📋 Summary/Overview
- 🎯 Goals/Objectives
- 👥 Users/Personas
- ✅ Requirements/Done
- ⚙️ Technical/Configuration
- 📖 Stories/Documentation
- 🔧 Implementation/Tools
- ⚠️ Risks/Warnings
- 📊 Metrics/Data
- ✓ Checklist/Verification

### Chat Context
- 🤖 AI Teammate
- 👤 Human user
- ✨ Excitement/enthusiasm
- 💡 Insight/idea
- 🎯 Focus/target

### Do NOT Use
- Multiple emoji in one message (1-2 max)
- Emoji in formal section content
- Trendy or unclear emoji
- Animated emoji (if supported)

## Consistency Checklist

Before finalizing any output:
- [ ] All sections use consistent formatting
- [ ] Headers have proper emoji and styling
- [ ] Lists use consistent bullet/numbering
- [ ] Text wraps properly on all screen sizes
- [ ] No orphaned paragraphs or lists
- [ ] Spacing is consistent
- [ ] Color contrast is adequate
- [ ] Readability is optimal
- [ ] Professional tone maintained
- [ ] All required information included

## Examples

### Complete PRD Section Example

```
📋 Project Summary
This project aims to revolutionize how teams collaborate on documentation 
by combining human creativity with AI-powered insights. TeamFlow provides 
a workspace where product managers and stakeholders can work alongside an 
AI teammate to generate comprehensive, high-quality PRDs in a fraction of 
the traditional time.

🎯 Objectives
- Reduce PRD generation time by 50% compared to manual methods
- Enable non-technical stakeholders to create professional requirements
- Establish feedback loops that improve document quality
- Achieve 95% stakeholder satisfaction with generated documents

👥 Target Users
- Product Managers: Need structured requirements in minimal time
- Technical Leads: Require clear specifications for implementation
- Startup Founders: Want professional documentation without hiring dedicated PMs
- Enterprise Teams: Seeking scalable collaboration tools

[... additional sections follow same pattern ...]
```

### Chat Message Exchange Example

```
👤 You
Can we make sure mobile users can access the app offline?

🤖 AI Teammate
Great question! Offline access is crucial for mobile adoption. ✅
I've updated the functional requirements to include offline mode 
support and added offline data sync to non-functional requirements.

I've also added "Implement progressive web app capabilities" to 
the implementation tasks for Phase 2.

Does offline-first approach align with your vision? Should we also 
consider which features to prioritize when in offline mode?
```
