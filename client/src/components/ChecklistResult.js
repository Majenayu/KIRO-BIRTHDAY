import React, { useState } from 'react';
import './ChecklistResult.css';
import SkillsSection from './SkillsSection';
import ResponsibilitiesSection from './ResponsibilitiesSection';
import ATSTipsSection from './ATSTipsSection';
import ExperienceEducationSection from './ExperienceEducationSection';

function ChecklistResult({ checklist, jobDescription, onReset }) {
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    responsibilities: true,
    tips: true,
    experience: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownload = () => {
    const checklistText = generateChecklistText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(checklistText));
    element.setAttribute('download', 'ats-resume-checklist.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateChecklistText = () => {
    let text = '=== ATS RESUME CHECKLIST ===\n\n';

    if (checklist.technical_skills.length > 0) {
      text += 'TECHNICAL SKILLS TO INCLUDE:\n';
      checklist.technical_skills.forEach(skillGroup => {
        text += `\n${skillGroup.category}:\n`;
        skillGroup.skills.forEach(skill => {
          text += `  ☐ ${skill}\n`;
        });
      });
      text += '\n';
    }

    if (checklist.responsibilities.length > 0) {
      text += 'KEY RESPONSIBILITIES TO ADDRESS:\n';
      checklist.responsibilities.forEach(resp => {
        text += `  ☐ ${resp}\n`;
      });
      text += '\n';
    }

    if (checklist.education.length > 0) {
      text += 'EDUCATION & CERTIFICATION:\n';
      checklist.education.forEach(edu => {
        text += `  ☐ ${edu}\n`;
      });
      text += '\n';
    }

    if (checklist.ats_tips.length > 0) {
      text += 'ATS OPTIMIZATION TIPS:\n';
      checklist.ats_tips.forEach(tip => {
        text += `\n${tip.title} [${tip.priority}]\n`;
        text += `${tip.description}\n`;
        text += `Action: ${tip.action}\n`;
      });
    }

    return text;
  };

  const handleCopyToClipboard = () => {
    const checklistText = generateChecklistText();
    navigator.clipboard.writeText(checklistText).then(() => {
      alert('Checklist copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const completionPercentage = calculateCompletionPercentage(checklist);

  return (
    <div className="result-container">
      <div className="result-header">
        <div className="result-header-content">
          <h2>✅ Your ATS Resume Checklist</h2>
          <div className="progress-section">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {completionPercentage}% Complete | {countCheckedItems(checklist)} / {getTotalItems(checklist)} items
            </p>
          </div>
        </div>
      </div>

      <div className="result-actions">
        <button className="action-button secondary" onClick={onReset}>
          ← Back to Job Description
        </button>
        <button className="action-button primary" onClick={handleCopyToClipboard}>
          📋 Copy Checklist
        </button>
        <button className="action-button primary" onClick={handleDownload}>
          ⬇️ Download
        </button>
      </div>

      <div className="checklist-sections">
        <SkillsSection
          skills={checklist.technical_skills}
          isExpanded={expandedSections.skills}
          onToggle={() => toggleSection('skills')}
        />

        <ExperienceEducationSection
          experience={checklist.experience_level}
          education={checklist.education}
          isExpanded={expandedSections.experience}
          onToggle={() => toggleSection('experience')}
        />

        <ResponsibilitiesSection
          responsibilities={checklist.responsibilities}
          keywords={checklist.keywords}
          isExpanded={expandedSections.responsibilities}
          onToggle={() => toggleSection('responsibilities')}
        />

        <ATSTipsSection
          tips={checklist.ats_tips}
          isExpanded={expandedSections.tips}
          onToggle={() => toggleSection('tips')}
        />
      </div>

      <div className="result-footer">
        <p>
          📌 <strong>Pro Tip:</strong> Use the keywords and skills from this checklist to optimize
          your resume. Tailor each bullet point to match the job description while highlighting
          your actual experience.
        </p>
      </div>
    </div>
  );
}

function calculateCompletionPercentage(checklist) {
  // This is a simple calculation; in a real app, you'd track which items are checked
  const totalSections = [
    checklist.technical_skills.length > 0 ? 1 : 0,
    checklist.responsibilities.length > 0 ? 1 : 0,
    checklist.education.length > 0 ? 1 : 0,
    checklist.ats_tips.length > 0 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return Math.min(totalSections * 25, 100);
}

function countCheckedItems(checklist) {
  // In a real app, track actual checked items
  return 0;
}

function getTotalItems(checklist) {
  let total = 0;
  if (checklist.technical_skills.length > 0) {
    total += checklist.technical_skills.reduce((sum, group) => sum + group.skills.length, 0);
  }
  total += checklist.responsibilities.length;
  total += checklist.education.length;
  total += checklist.ats_tips.length;
  return total;
}

export default ChecklistResult;
