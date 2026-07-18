import React from 'react';

function SkillsSection({ skills, isExpanded, onToggle }) {
  if (skills.length === 0) return null;

  const totalSkills = skills.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <div className="section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-icon">🛠️</span>
          <div>
            <h3 className="section-title">Technical Skills to Include</h3>
            <span className="section-count">{totalSkills} skills identified</span>
          </div>
        </div>
        <span className={`section-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="skill-group">
              <div className="skill-group-title">{skillGroup.category}</div>
              <div className="skill-list">
                {skillGroup.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="skill-tag">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f4ff', borderRadius: '6px' }}>
            <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 0.5rem 0' }}>💡 How to Use:</p>
            <p style={{ color: '#555', margin: 0, fontSize: '0.9rem' }}>
              Add a dedicated "Skills" section to your resume and include these keywords naturally throughout your experience bullets. This helps ATS systems match your resume with job requirements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsSection;
