import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OptimizedResumePage.css';

import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import htmlDocx from 'html-docx-js/dist/html-docx';
import html2pdf from 'html2pdf.js';

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
  const [isHighlighted, setIsHighlighted] = useState(false);

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

  const handleDownloadWord = () => {
    const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${resumeContent.replace(/\n/g, '<br>')}</body></html>`;
    const converted = htmlDocx.asBlob(htmlContent);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(converted);
    link.download = 'Optimized_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = resumeContent.replace(/\n/g, '<br>');
    html2pdf().set({ filename: 'Optimized_Resume.pdf' }).from(element).save();
  };

  const handleAddKeywords = () => {
    const activeKeywords = unmatchedKeywords.filter(kw => !removedKeywords.includes(kw));
    const activeExtras = extraKeywords.filter(kw => !removedExtras.includes(kw));
    const allKeywords = [...activeKeywords, ...activeExtras];
    if (allKeywords.length && !keywordsAdded) {
      const appended = `\n\n🔑 Added Keywords for ATS: ${allKeywords.join(', ')}`;
      setResumeContent(resumeContent + appended);
      setEditedContent(editedContent + appended);
      setCurrentMatch(Math.min(currentMatch + allKeywords.length * 2, 100));
      setKeywordsAdded(true);
    }
  };

  const handleUndoKeywords = () => {
    setResumeContent(originalOptimizedContent);
    setEditedContent(originalOptimizedContent);
    setCurrentMatch(state?.matchPercentage || 0);
    setKeywordsAdded(false);
    setIsHighlighted(false);
  };

  const handleHighlight = () => {
    let highlighted = editedContent;
    matchedKeywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    setResumeContent(highlighted);
    setIsHighlighted(true);
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
          ) : isHighlighted ? (
            <div
              className="resume-html-output"
              dangerouslySetInnerHTML={{ __html: resumeContent }}
            />
          ) : (
            <pre className="resume-html-output">{resumeContent}</pre>
          )}
        </div>

        <div className="button-group">
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '💾 Save' : '✏️ Edit'}
          </button>
          <button className="download-button" onClick={handleDownload}>
            ⬇️ Download .txt
          </button>
          <button className="download-button" onClick={handleDownloadWord}>
            📄 Download .docx
          </button>
          <button className="download-button" onClick={handleDownloadPDF}>
            📕 Download .pdf
          </button>
        </div>

        <div className="button-group" style={{ marginTop: '1rem' }}>
          <button className="edit-button" onClick={handleHighlight}>
            🎯 Highlight Keywords
          </button>
          <button className="download-button" onClick={handleUndoKeywords} disabled={!keywordsAdded}>
            ↩️ Undo Highlights
          </button>
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
