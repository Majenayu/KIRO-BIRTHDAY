import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import JobDescriptionInput from './components/JobDescriptionInput';
import ChecklistResult from './components/ChecklistResult';
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setChecklist(null);

    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        jobDescription: jobDescription
      });

      if (response.data.success) {
        setChecklist(response.data.checklist);
      } else {
        setError('Failed to generate checklist. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.message ||
        'Error connecting to server. Make sure the backend is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobDescription('');
    setChecklist(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📋 ATS Resume Checklist Generator</h1>
          <p>Instantly generate an ATS-friendly resume checklist from any job description</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {!checklist ? (
            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onAnalyze={handleAnalyze}
              loading={loading}
              error={error}
            />
          ) : (
            <ChecklistResult
              checklist={checklist}
              jobDescription={jobDescription}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Made for students to ace ATS screenings | Powered by AI Resume Analysis</p>
      </footer>
    </div>
  );
}

export default App;
