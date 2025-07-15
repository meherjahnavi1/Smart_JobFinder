import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OptimizedResumePage.css';

import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';

const OptimizedResumePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const optimizedContent = state?.content?.trim() || '⚠️ No optimized resume available.';
  const matchPercentage = state?.matchPercentage || 0;

  const handleBack = () => {
    navigate('/compare-result', {
      state: state?.previousState || {},
    });
  };

  const handleDownload = () => {
    const blob = new Blob([optimizedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Optimized_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="optimized-page-container">
      <button className="back-button" onClick={handleBack}>← Back</button>

      <div className="optimized-box">
        <div className="optimized-header">
          <h1 className="title">✨ Optimized Resume</h1>
          <span className="score-badge">📊 ATS Score: {matchPercentage}%</span>
        </div>

        <div className="resume-box">
          <textarea
            readOnly
            value={optimizedContent}
            className="resume-textarea"
          />
        </div>

        <div className="button-group">
          <button className="edit-button" onClick={() => alert("Editing coming soon!")}>
            ✏️ Edit
          </button>
          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download Optimized Resume
          </button>
        </div>
      </div>

      <div className="template-section">
        <h2 className="template-heading">Choose a <span className="highlight">Resume Template</span></h2>
        <div className="template-grid">
          <div className="template-card">
            <img src={template1} alt="Junior" className="template-image" />
            <p className="template-title">Junior</p>
            <p className="template-description">1–3 years of experience</p>
          </div>
          <div className="template-card">
            <img src={template2} alt="Senior" className="template-image" />
            <p className="template-title">Senior</p>
            <p className="template-description">3–7+ years of experience</p>
          </div>
          <div className="template-card">
            <img src={template3} alt="Executive" className="template-image" />
            <p className="template-title">Executive</p>
            <p className="template-description">10+ years of experience</p>
          </div>
          <div className="template-card">
            <img src={template4} alt="Intern" className="template-image" />
            <p className="template-title">Intern</p>
            <p className="template-description">Entry-level internship</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedResumePage;
