// src/pages/OptimizedResumePage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OptimizedResumePage.css';

const OptimizedResumePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const originalContent = state?.content?.trim() || '⚠️ No optimized resume available.';
  const matchPercentage = state?.matchPercentage || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [resumeText, setResumeText] = useState(originalContent);

  const handleBack = () => {
    navigate('/compare-result', {
      state: state?.previousState || {},
    });
  };

  const handleDownload = () => {
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
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
          {isEditing ? (
            <textarea
              className="resume-textarea"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={25}
            />
          ) : (
            <pre className="resume-content">{resumeText}</pre>
          )}
        </div>

        <div className="button-group">
          <button
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '✅ Save Edit' : '✏️ Edit Resume'}
          </button>

          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download Optimized Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizedResumePage;
