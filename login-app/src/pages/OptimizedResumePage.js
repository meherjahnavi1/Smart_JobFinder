import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OptimizedResumePage.css';

import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';

const OptimizedResumePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const optimizedContent = state?.content?.trim() || '⚠️ No optimized resume available.';
  const highlightedContent = state?.highlightedContent?.trim();
  const matchPercentage = state?.matchPercentage || 0;
  const matchedKeywords = state?.matchedKeywords || [];
  const unmatchedKeywords = state?.unmatchedKeywords || [];

  useEffect(() => {
    console.log("✨ Highlighted Resume:", highlightedContent);
    console.log("✅ Matched Keywords:", matchedKeywords);
    console.log("❌ Unmatched Keywords:", unmatchedKeywords);
  }, [highlightedContent, matchedKeywords, unmatchedKeywords]);

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
          {highlightedContent ? (
            <div
              className="resume-html-output"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          ) : (
            <div className="resume-html-output fallback">
              <pre>{optimizedContent}</pre>
              <p className="note-text">⚠️ Highlighted content not available.</p>
            </div>
          )}
        </div>

        <div className="button-group">
          <button className="edit-button" onClick={() => alert("Editing coming soon!")}>
            ✏️ Edit
          </button>
          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download Optimized Resume
          </button>
        </div>

        <div className="keyword-panels">
          <div className="panel matched-panel">
            <h3>✅ Matched Keywords</h3>
            <div className="pills">
              {matchedKeywords.length ? matchedKeywords.map((kw, i) => (
                <span key={i} className="pill">{kw}</span>
              )) : <span className="none-text">None</span>}
            </div>
          </div>

          <div className="panel unmatched-panel">
            <h3>❌ Unmatched Keywords</h3>
            <div className="pills">
              {unmatchedKeywords.length ? unmatchedKeywords.map((kw, i) => (
                <span key={i} className="pill unmatched">{kw}</span>
              )) : <span className="none-text">All covered 🎉</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="template-section">
        <h2 className="template-heading">Choose a <span className="highlight">Resume Template</span></h2>
        <div className="template-grid">
          {[{ id: 'junior', img: template1, title: 'Junior', desc: '1–3 years' },
            { id: 'senior', img: template2, title: 'Senior', desc: '3–7+ years' },
            { id: 'executive', img: template3, title: 'Executive', desc: '10+ years' },
            { id: 'intern', img: template4, title: 'Intern', desc: 'Entry-level' }]
            .map(t => (
              <div
                key={t.id}
                className={`template-card ${selectedTemplate === t.id ? 'selected-template' : ''}`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                <img src={t.img} alt={t.title} className="template-image" />
                <p className="template-title">{t.title}</p>
                <p className="template-description">{t.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedResumePage;
