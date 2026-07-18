import React from 'react';
import './JobDescriptionInput.css';

function JobDescriptionInput({
  jobDescription,
  setJobDescription,
  onAnalyze,
  loading,
  error
}) {
  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text');
    setJobDescription(text);
  };

  const characterCount = jobDescription.length;

  return (
    <div className="input-container">
      <div className="input-card">
        <h2>Paste Your Job Description</h2>
        <p className="input-subtitle">
          Copy and paste the full job description from the job posting.
        </p>

        <div className="textarea-wrapper">
          <textarea
            className={`job-description-textarea ${error ? 'error' : ''}`}
            placeholder="Paste job description here... You can also copy from a job posting and paste directly."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onPaste={handlePaste}
            rows={12}
          />
          <div className="character-count">
            {characterCount.toLocaleString()} characters
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        <button
          className="analyze-button"
          onClick={onAnalyze}
          disabled={loading || !jobDescription.trim()}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              🚀 Generate Checklist
            </>
          )}
        </button>

        <div className="input-tips">
          <h4>💡 Tips:</h4>
          <ul>
            <li>Include the full job description for accurate analysis</li>
            <li>Include job requirements, responsibilities, and qualifications</li>
            <li>The more detailed the job description, the better the checklist</li>
          </ul>
        </div>
      </div>

      <div className="example-card">
        <h3>📝 Example Job Description</h3>
        <p className="example-text">
          Here's what a good job description should include:
        </p>
        <div className="example-content">
          <strong>Job Title:</strong> Senior React Developer<br/><br/>
          <strong>Requirements:</strong>
          <ul>
            <li>5+ years of experience with React and JavaScript</li>
            <li>Experience with Node.js and Express</li>
            <li>Proficiency in PostgreSQL and MongoDB</li>
            <li>Strong knowledge of Git and Docker</li>
          </ul>
          <strong>Responsibilities:</strong>
          <ul>
            <li>Develop and maintain scalable React applications</li>
            <li>Collaborate with backend developers on API design</li>
            <li>Optimize application performance and user experience</li>
            <li>Code review and mentor junior developers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionInput;
