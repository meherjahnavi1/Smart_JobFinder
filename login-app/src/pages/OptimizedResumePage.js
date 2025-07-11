// src/pages/OptimizedResumePage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OptimizedResumePage.css';

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
          <pre className="resume-content">{optimizedContent}</pre>
        </div>

        <div className="download-button-container">
          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download Optimized Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizedResumePage;
