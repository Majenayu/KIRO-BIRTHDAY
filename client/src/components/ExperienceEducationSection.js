import React, { useState } from 'react';

function ExperienceEducationSection({ experience, education, isExpanded, onToggle }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!experience.mentioned && education.length === 0) return null;

  return (
    <div className="section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-icon">🎓</span>
          <div>
            <h3 className="section-title">Experience & Education</h3>
            <span className="section-count">
              {(experience.mentioned ? 1 : 0) + education.length} items
            </span>
          </div>
        </div>
        <span className={`section-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          {experience.mentioned && (
            <>
              <h4 style={{ color: '#667eea', fontWeight: '600', marginBottom: '0.75rem' }}>
                Years of Experience
              </h4>
              <div
                className="checklist-item"
                style={{ opacity: checkedItems['exp'] ? 0.6 : 1 }}
              >
                <div
                  className={`checkbox ${checkedItems['exp'] ? 'checked' : ''}`}
                  onClick={() => toggleCheck('exp')}
                >
                  {checkedItems['exp'] && '✓'}
                </div>
                <div className="checklist-item-text">
                  <div
                    className="checklist-item-label"
                    style={{
                      textDecoration: checkedItems['exp'] ? 'line-through' : 'none'
                    }}
                  >
                    Minimum {experience.minYears} years of relevant experience
                  </div>
                  <div className="checklist-item-description">
                    Ensure your resume clearly shows you meet or exceed this requirement
                  </div>
                </div>
              </div>
              {education.length > 0 && <div style={{ marginTop: '1.5rem' }}></div>}
            </>
          )}

          {education.length > 0 && (
            <>
              <h4 style={{ color: '#667eea', fontWeight: '600', marginBottom: '0.75rem' }}>
                Required Education
              </h4>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="checklist-item"
                  style={{ opacity: checkedItems[`edu-${idx}`] ? 0.6 : 1 }}
                >
                  <div
                    className={`checkbox ${checkedItems[`edu-${idx}`] ? 'checked' : ''}`}
                    onClick={() => toggleCheck(`edu-${idx}`)}
                  >
                    {checkedItems[`edu-${idx}`] && '✓'}
                  </div>
                  <div className="checklist-item-text">
                    <div
                      className="checklist-item-label"
                      style={{
                        textDecoration: checkedItems[`edu-${idx}`] ? 'line-through' : 'none'
                      }}
                    >
                      {edu}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f4ff', borderRadius: '6px' }}>
            <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 0.5rem 0' }}>💡 How to Use:</p>
            <p style={{ color: '#555', margin: 0, fontSize: '0.9rem' }}>
              Add an "Education" section if you haven't already. Include your degree(s), university/institution, graduation date, and any relevant certifications or achievements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExperienceEducationSection;
