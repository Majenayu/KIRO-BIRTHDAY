# ATS Resume Checklist Generator - Backend

This is the Node.js/Express backend server for the ATS Resume Checklist Generator.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Running
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000` by default.

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Analyze Job Description
```
POST /api/analyze
```
Analyzes a job description and generates an ATS-friendly resume checklist.

**Request Body:**
```json
{
  "jobDescription": "Full job description text..."
}
```

**Response:**
```json
{
  "success": true,
  "checklist": {
    "technical_skills": [
      {
        "category": "PROGRAMMING LANGUAGES",
        "skills": ["python", "javascript"],
        "count": 2
      }
    ],
    "experience_level": {
      "minYears": 5,
      "mentioned": true
    },
    "education": ["Bachelor's Degree"],
    "responsibilities": ["Develop features", "Code review"],
    "keywords": ["python", "javascript", "git"],
    "ats_tips": [
      {
        "id": "keywords",
        "priority": "HIGH",
        "title": "Include Critical Keywords",
        "description": "...",
        "action": "..."
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📦 Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **body-parser**: Parse request bodies

## 🔍 Analyzer Features

The analyzer (`analyzer.js`) extracts:

### Technical Skills Categories
- Programming Languages: Python, JavaScript, Java, C++, etc.
- Web Frameworks: React, Vue, Angular, Django, etc.
- Databases: SQL, MongoDB, PostgreSQL, etc.
- Tools & Platforms: Git, Docker, AWS, etc.
- Data Skills: Machine Learning, Analytics, etc.
- Soft Skills: Communication, Leadership, etc.

### Other Extractions
- **Experience Requirements**: Minimum years of experience
- **Education Requirements**: Degree levels and certifications
- **Responsibilities**: Key job duties and tasks
- **Keywords**: Most important terms for ATS matching
- **ATS Tips**: Actionable recommendations based on the job description

## 🛠️ Configuration

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
PORT=5000
NODE_ENV=development
```

## 📝 Example Request

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "We are looking for a Senior React Developer with 5+ years of experience..."
  }'
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing job description)
- `500`: Server Error

Error Response:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error information"
}
```

## 🔧 Extending the Analyzer

To add new skill categories, edit `analyzer.js` and add entries to the `TECHNICAL_KEYWORDS` object:

```javascript
const TECHNICAL_KEYWORDS = {
  'new_category': [
    'keyword1', 'keyword2', 'keyword3'
  ]
};
```

## 📊 How Analysis Works

1. **Keyword Extraction**: Searches job description for technical keywords
2. **Experience Parsing**: Looks for patterns like "5+ years of experience"
3. **Education Detection**: Identifies education requirements
4. **Responsibility Extraction**: Finds bullet points with action verbs
5. **ATS Tip Generation**: Creates recommendations based on findings

## 🐛 Debugging

Enable debug logging by adding console logs in analyzer.js or server.js:

```javascript
console.log('Processing job description:', jobDescription.substring(0, 100));
```

## 📚 Technologies

- Node.js
- Express.js
- JavaScript (ES6+)

## 🤝 Contributing

Improvements welcome! Consider:
- Adding NLP for better keyword extraction
- Supporting PDF uploads
- Improving responsibility extraction
- Adding industry-specific keywords

---

For the full project documentation, see the main README.md
