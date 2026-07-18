const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resumeAnalyzer = require('./analyzer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Main endpoint: Analyze job description and generate checklist
app.post('/api/analyze', (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({
        error: 'Job description is required',
        success: false
      });
    }

    const checklist = resumeAnalyzer.generateChecklist(jobDescription);
    
    res.json({
      success: true,
      checklist,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error analyzing job description:', error);
    res.status(500).json({
      error: 'Failed to analyze job description',
      message: error.message,
      success: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`ATS Resume Checklist Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
