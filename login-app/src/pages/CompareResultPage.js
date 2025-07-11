import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './CompareResultPage.css';

const COLORS = ['#10B981', '#EF4444']; // green, red

export default function CompareResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Read the array you passed under `results`
  const resumeResults = Array.isArray(state?.results) ? state.results : [];

  // State for optimized text and UI
  const [optimizedMap, setOptimizedMap] = useState({});
  const [loadingIdx, setLoadingIdx] = useState(null);
  const [previewIdx, setPreviewIdx] = useState(null);

  const handleOptimize = async (text, unmatched, idx, previewOnly = false) => {
    if (!unmatched.length) {
      setOptimizedMap((prev) => ({ ...prev, [idx]: text }));
      if (previewOnly) setPreviewIdx(idx);
      return;
    }
    setLoadingIdx(idx);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/generate-optimized-resume',
        { resumeText: text, unmatchedKeywords: unmatched }
      );
      setOptimizedMap((prev) => ({ ...prev, [idx]: data.optimizedResume }));
      if (previewOnly) setPreviewIdx(idx);
    } catch {
      alert('Failed to optimize resume');
    } finally {
      setLoadingIdx(null);
    }
  };

  const downloadTxt = (idx, filename) => {
    const content = optimizedMap[idx] || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Optimized_${filename.replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="compare-result-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </button>
      <h1 className="page-title">📋 AI Resume vs JD Comparison</h1>

      {resumeResults.map((r, i) => {
        const {
          filename,
          matchedKeywords = [],
          unmatchedKeywords = [],
          matchPercentage = 0,
          originalText = ''
        } = r;

        const chartData = [
          { name: 'Matched', value: matchedKeywords.length },
          { name: 'Unmatched', value: unmatchedKeywords.length }
        ];

        return (
          <div key={i} className="resume-block">
            <div className="resume-header">
              <span className="filename">{filename}</span>
              <span className="badge">{matchPercentage}% match</span>
            </div>

            <div className="main-content">
              <PieChart width={160} height={160}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                >
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
              </PieChart>

              <div className="keywords-panels">
                <div className="panel matched-panel">
                  <h3>✅ Matched Keywords</h3>
                  <div className="pills">
                    {matchedKeywords.length
                      ? matchedKeywords.map((kw, k) => (
                          <span key={k} className="pill">{kw}</span>
                        ))
                      : <span className="none-text">None</span>}
                  </div>
                </div>

                <div className="panel unmatched-panel">
                  <h3>❌ Unmatched Keywords</h3>
                  <div className="pills">
                    {unmatchedKeywords.length
                      ? unmatchedKeywords.map((kw, k) => (
                          <span key={k} className="pill">{kw}</span>
                        ))
                      : <span className="none-text">None</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="suggestions">
              💡 Consider adding: <strong>{unmatchedKeywords.slice(0,5).join(', ') || '—'}</strong>
            </div>

            <div className="actions">
              <button
                className="btn preview-btn"
                onClick={() => handleOptimize(originalText, unmatchedKeywords, i, true)}
                disabled={loadingIdx === i}
              >
                {loadingIdx === i ? 'Generating…' : '👁️ Preview Optimized Resume'}
              </button>
              <button
                className="btn download-btn"
                onClick={() => downloadTxt(i, filename)}
                disabled={!optimizedMap[i]}
              >
                ⬇️ Download Optimized Resume
              </button>
            </div>
          </div>
        );
      })}

      {previewIdx !== null && (
        <div className="modal-overlay" onClick={() => setPreviewIdx(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>✨ Preview Optimized Resume</h2>
            <pre className="modal-text">{optimizedMap[previewIdx]}</pre>
            <button className="btn close-btn" onClick={() => setPreviewIdx(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
