// OptimizedResumePage.js
import React, { useState, useEffect, useMemo } from 'react';
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

  const originalOptimizedContent = state?.content?.trim() || '⚠️ No optimized resume available.';
  const highlightedContent = state?.highlightedContent?.trim();
  const matchedKeywords = useMemo(() => state?.matchedKeywords || [], [state]);
  const unmatchedKeywords = useMemo(() => state?.unmatchedKeywords || [], [state]);
  const extraKeywords = useMemo(() => state?.extraKeywords || [], [state]);
  const [removedKeywords, setRemovedKeywords] = useState([]);
  const [removedExtras, setRemovedExtras] = useState([]);

  const [resumeContent, setResumeContent] = useState(originalOptimizedContent);
  const [currentMatch, setCurrentMatch] = useState(state?.matchPercentage || 0);
  const [keywordsAdded, setKeywordsAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(originalOptimizedContent);

  useEffect(() => {
    console.log("✨ Highlighted Resume:", highlightedContent);
    console.log("✅ Matched Keywords:", matchedKeywords);
    console.log("❌ Unmatched Keywords:", unmatchedKeywords);
    console.log("📌 Extra Keywords:", extraKeywords);
  }, [highlightedContent, matchedKeywords, unmatchedKeywords, extraKeywords]);

  const handleBack = () => {
    navigate('/compare-result', {
      state: state?.previousState || {},
    });
  };

  const handleDownload = () => {
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Optimized_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddKeywords = () => {
    const activeKeywords = unmatchedKeywords.filter(kw => !removedKeywords.includes(kw));
    const activeExtras = extraKeywords.filter(kw => !removedExtras.includes(kw));
    const allKeywords = [...activeKeywords, ...activeExtras];
    if (allKeywords.length && !keywordsAdded) {
      const appended = `\n\n🔑 Added Keywords for ATS: ${allKeywords.join(', ')}`;
      setResumeContent(resumeContent + appended);
      setEditedContent(editedContent + appended);
      setCurrentMatch(currentMatch + 10);
      setKeywordsAdded(true);
    }
  };

  const handleUndoKeywords = () => {
    setResumeContent(originalOptimizedContent);
    setEditedContent(originalOptimizedContent);
    setCurrentMatch(state?.matchPercentage || 0);
    setKeywordsAdded(false);
  };

  const handleRemoveKeyword = (keyword) => {
    setRemovedKeywords(prev => [...prev, keyword]);
  };

  const handleRestoreKeyword = (keyword) => {
    setRemovedKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleRemoveExtra = (keyword) => {
    setRemovedExtras(prev => [...prev, keyword]);
  };

  const handleRestoreExtra = (keyword) => {
    setRemovedExtras(prev => prev.filter(k => k !== keyword));
  };

  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
    const routeMap = {
      junior: '/templates/junior',
      senior: '/templates/senior',
      executive: '/templates/executive',
      intern: '/templates/intern',
    };
    navigate(routeMap[templateId]);
  };

  return (
    <div className="optimized-page-container">
      <button className="back-button" onClick={handleBack}>← Back</button>

      <div className="optimized-box">
        <div className="optimized-header">
          <h1 className="title">✨ Optimized Resume</h1>
          <span className="score-badge">📊 ATS Score: {currentMatch}%</span>
        </div>

        <div className="resume-box">
          {isEditing ? (
            <textarea
              className="resume-editor"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={20}
            />
          ) : highlightedContent ? (
            <div
              className="resume-html-output"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          ) : (
            <div className="resume-html-output fallback">
              <pre>{resumeContent}</pre>
              <p className="note-text">⚠️ Highlighted content not available.</p>
            </div>
          )}
        </div>

        <div className="button-group">
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '💾 Save' : '✏️ Edit'}
          </button>
          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download Optimized Resume
          </button>
        </div>

        <div className="button-group" style={{ marginTop: '1rem' }}>
          <button className="edit-button" onClick={handleAddKeywords} disabled={keywordsAdded}>
            🔁 Add to Resume
          </button>
          <button className="download-button" onClick={handleUndoKeywords} disabled={!keywordsAdded}>
            ↩️ Undo Additions
          </button>
        </div>

        <div className="panel removed-panel">
          <h3>🗑️ Removed Keywords</h3>
          <div className="pills">
            {removedKeywords.length ? (
              removedKeywords.map((kw, i) => (
                <span key={i} className="pill removed">
                  {kw} <button onClick={() => handleRestoreKeyword(kw)}>➕</button>
                </span>
              ))
            ) : (
              <span className="none-text">None removed</span>
            )}
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
                onClick={() => handleTemplateClick(t.id)}
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