import React from 'react';

function ATSTipsSection({ tips, isExpanded, onToggle }) {
  if (tips.length === 0) return null;

  const highPriorityCount = tips.filter(t => t.priority === 'HIGH').length;

  return (
    <div className="section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-icon">⚡</span>
          <div>
            <h3 className="section-title">ATS Optimization Tips</h3>
            <span className="section-count">
              {highPriorityCount} high priority
            </span>
          </div>
        </div>
        <span className={`section-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-item">
              <div className="tip-header">
                <h4 className="tip-title">{tip.title}</h4>
                <span className={`priority-badge ${tip.priority.toLowerCase()}`}>
                  {tip.priority}
                </span>
              </div>
              <p className="tip-description">{tip.description}</p>
              <div className="tip-action">
                ✓ {tip.action}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '6px', border: '1px solid #ffc107' }}>
            <p style={{ color: '#856404', fontWeight: '600', margin: '0 0 0.5rem 0' }}>📌 Important:</p>
            <p style={{ color: '#856404', margin: 0, fontSize: '0.9rem' }}>
              These tips are based on ATS (Applicant Tracking System) best practices. ATS systems scan resumes for keywords and formatting. Following these recommendations will significantly improve your chances of passing through ATS screening.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ATSTipsSection;
