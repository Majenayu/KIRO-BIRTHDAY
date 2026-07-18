import React, { useState } from 'react';

function ResponsibilitiesSection({ responsibilities, keywords, isExpanded, onToggle }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (responsibilities.length === 0) return null;

  return (
    <div className="section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-icon">📋</span>
          <div>
            <h3 className="section-title">Key Responsibilities to Address</h3>
            <span className="section-count">{responsibilities.length} responsibilities</span>
          </div>
        </div>
        <span className={`section-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          {responsibilities.map((resp, idx) => (
            <div
              key={idx}
              className="checklist-item"
              style={{ opacity: checkedItems[idx] ? 0.6 : 1 }}
            >
              <div
                className={`checkbox ${checkedItems[idx] ? 'checked' : ''}`}
                onClick={() => toggleCheck(idx)}
              >
                {checkedItems[idx] && '✓'}
              </div>
              <div className="checklist-item-text">
                <div
                  className="checklist-item-label"
                  style={{
                    textDecoration: checkedItems[idx] ? 'line-through' : 'none'
                  }}
                >
                  {resp}
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f4ff', borderRadius: '6px' }}>
            <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 0.5rem 0' }}>💡 How to Use:</p>
            <p style={{ color: '#555', margin: 0, fontSize: '0.9rem' }}>
              Rewrite your bullet points to address these responsibilities. Use action verbs like "developed", "implemented", "optimized", and include measurable outcomes. Make sure to mirror the language used in the job description.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsibilitiesSection;
