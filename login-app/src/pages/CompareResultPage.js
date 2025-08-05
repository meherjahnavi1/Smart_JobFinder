import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './CompareResultPage.css';

const COLORS = ['#10B981', '#EF4444'];

export default function CompareResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const resumeResults = Array.isArray(state?.results) ? state.results : [];
  const jobDescription = state?.jobDescription || '';

  const [optimizedMap, setOptimizedMap] = useState({});
  const [loadingIdx, setLoadingIdx] = useState(null);
  const [removedMap, setRemovedMap] = useState({});
  const [extraRemovedMap, setExtraRemovedMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [pendingKeywords, setPendingKeywords] = useState([]);
  const [pendingIndex, setPendingIndex] = useState(null);

  useEffect(() => {
    if (!resumeResults.length) {
      navigate('/');
    }
  }, [resumeResults, navigate]);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleRemoveKeyword = (index, keyword) => {
    const updated = [...resumeResults];
    const removed = removedMap[index] || [];
    updated[index].unmatchedKeywords = updated[index].unmatchedKeywords.filter(k => k !== keyword);
    removed.push(keyword);
    setRemovedMap(prev => ({ ...prev, [index]: removed }));
  };

  const handleAddBackKeyword = (index, keyword) => {
    const updated = [...resumeResults];
    updated[index].unmatchedKeywords.push(keyword);
    setRemovedMap(prev => ({ ...prev, [index]: prev[index].filter(k => k !== keyword) }));
  };

  const handleRemoveExtraKeyword = (index, keyword) => {
    const updated = [...resumeResults];
    const removed = extraRemovedMap[index] || [];
    updated[index].extraKeywords = updated[index].extraKeywords.filter(k => k !== keyword);
    removed.push(keyword);
    setExtraRemovedMap(prev => ({ ...prev, [index]: removed }));
  };

  const handleAddBackExtraKeyword = (index, keyword) => {
    const updated = [...resumeResults];
    updated[index].extraKeywords.push(keyword);
    setExtraRemovedMap(prev => ({ ...prev, [index]: prev[index].filter(k => k !== keyword) }));
  };

  const handleOptimize = async (resumeText, unmatchedKeywords, extraKeywords, idx, previewOnly = false) => {
    if (!unmatchedKeywords.length && !extraKeywords.length) {
      setOptimizedMap((prev) => ({ ...prev, [idx]: resumeText }));
      if (previewOnly) {
        navigate('/optimized-resume', {
          state: {
            resumeText,
            jobDescription,
            unmatchedKeywords,
            matchPercentage: resumeResults[idx]?.matchPercentage || 0,
            content: resumeText,
            highlightedContent: resumeText,
            insertedKeywords: [],
            previousState: state
          }
        });
      }
      return;
    }

    setLoadingIdx(idx);
    try {
      const { data } = await axios.post('http://localhost:3001/api/generate-optimized-resume', {
        resumeText,
        unmatchedKeywords,
        extraKeywords,
        jobDescription
      });

      setOptimizedMap((prev) => ({ ...prev, [idx]: data.optimizedResume }));

      if (previewOnly) {
        navigate('/optimized-resume', {
          state: {
            resumeText,
            jobDescription,
            unmatchedKeywords,
            matchPercentage: data.updatedMatchPercentage || resumeResults[idx]?.matchPercentage || 0,
            content: data.optimizedResume,
            highlightedContent: data.highlightedResume,
            insertedKeywords: data.insertedKeywords,
            removedKeywords: data.removedKeywords || [],
            previousState: state
          }
        });
      }
    } catch (err) {
      console.error('Optimization failed:', err);
    } finally {
      setLoadingIdx(null);
    }
  };

  const previewBeforeOptimize = (resumeText, unmatchedKeywords, extraKeywords, idx) => {
    const unremovedUnmatched = unmatchedKeywords.filter(k => !(removedMap[idx] || []).includes(k));
    const unremovedExtras = extraKeywords.filter(k => !(extraRemovedMap[idx] || []).includes(k));
    setPendingKeywords([...unremovedUnmatched, ...unremovedExtras]);
    setPendingIndex(idx);
    setShowModal(true);
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
      <button className="back-button" onClick={() => navigate('/')}>← Back to Dashboard</button>
      <h1 className="page-title">📋 AI Resume vs JD Comparison</h1>

      {resumeResults.map((r, i) => {
        const {
          filename,
          matchedKeywords = [],
          unmatchedKeywords = [],
          extraKeywords = [],
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
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
              </PieChart>

              <div className="keywords-panels">
                <div className="panel matched-panel">
                  <h3>✅ Matched Keywords</h3>
                  <div className="pills">
                    {matchedKeywords.length ? matchedKeywords.map((kw, k) => (
                      <span key={k} className="pill">{kw}</span>
                    )) : <span className="none-text">None</span>}
                  </div>
                </div>

                <div className="panel unmatched-panel">
                  <h3>❌ Unmatched Keywords</h3>
                  <div className="pills">
                    {unmatchedKeywords.length ? unmatchedKeywords.map((kw, k) => (
                      <span key={k} className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {kw}
                        <button onClick={() => handleRemoveKeyword(i, kw)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>❌</button>
                      </span>
                    )) : <span className="none-text">None</span>}
                  </div>
                </div>

                <div className="panel removed-panel">
                  <h3>🗑️ Removed Keywords</h3>
                  <div className="pills">
                    {removedMap[i]?.length ? removedMap[i].map((kw, k) => (
                      <span key={k} className="pill removed">
                        {kw}
                        <button onClick={() => handleAddBackKeyword(i, kw)} style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer' }}>➕</button>
                      </span>
                    )) : <span className="none-text">None removed</span>}
                  </div>
                </div>

                <div className="panel extra-panel">
                  <h3>📌 Extra Technical Skills</h3>
                  <div className="pills">
                    {extraKeywords.length ? extraKeywords.map((kw, k) => (
                      <span key={k} className="pill blue">
                        {kw}
                        <button onClick={() => handleRemoveExtraKeyword(i, kw)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>❌</button>
                      </span>
                    )) : <span className="none-text">None</span>}
                  </div>
                  {extraRemovedMap[i]?.length > 0 && (
                    <div className="panel removed-panel">
                      <h4>➕ Removed Extra Skills</h4>
                      <div className="pills">
                        {extraRemovedMap[i].map((kw, k) => (
                          <span key={k} className="pill removed">
                            {kw}
                            <button onClick={() => handleAddBackExtraKeyword(i, kw)} style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer' }}>➕</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="suggestions">
              💡 Consider adding: <strong>{unmatchedKeywords.slice(0, 5).join(', ') || '—'}</strong>
            </div>

            <div className="actions">
              <button className="btn preview-btn" onClick={() => previewBeforeOptimize(originalText, unmatchedKeywords, extraKeywords, i)} disabled={loadingIdx === i}>
                {loadingIdx === i ? 'Generating…' : '👁️ Preview Optimized Resume'}
              </button>
              <button className="btn download-btn" onClick={() => downloadTxt(i, filename)} disabled={!optimizedMap[i]}>
                ⬇️ Download Optimized Resume
              </button>
            </div>
          </div>
        );
      })}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">📝 Confirm Keywords to Add</h2>
            <p className="modal-desc">The following keywords will be added to the optimized resume:</p>
            <div className="pills" style={{ marginTop: '1rem' }}>
              {pendingKeywords.length ? (
                pendingKeywords.map((kw, idx) => <span key={idx} className="pill preview">{kw}</span>)
              ) : (
                <span className="none-text">No keywords</span>
              )}
            </div>
            <div className="actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn close-btn" onClick={() => setShowModal(false)}>← Go Back</button>
              <button className="btn preview-btn" onClick={() => {
                const resumeText = resumeResults[pendingIndex]?.originalText;
                const unmatchedKeywords = resumeResults[pendingIndex]?.unmatchedKeywords.filter(k => !(removedMap[pendingIndex] || []).includes(k)) || [];
                const extraKeywords = resumeResults[pendingIndex]?.extraKeywords.filter(k => !(extraRemovedMap[pendingIndex] || []).includes(k)) || [];
                handleOptimize(resumeText, unmatchedKeywords, extraKeywords, pendingIndex, true);
                setShowModal(false);
              }}
            
  className="btn preview-btn"
  onClick={async () => {
    const resumeText = resumeResults[pendingIndex]?.originalText;
    const unmatchedKeywords = resumeResults[pendingIndex]?.unmatchedKeywords.filter(k => !(removedMap[pendingIndex] || []).includes(k)) || [];
    const extraKeywords = resumeResults[pendingIndex]?.extraKeywords.filter(k => !(extraRemovedMap[pendingIndex] || []).includes(k)) || [];

    setShowModal(false); // close modal first
    setLoadingIdx(pendingIndex); // optionally show spinner

    try {
      const { data } = await axios.post('http://localhost:3001/api/generate-optimized-resume', {
        resumeText,
        unmatchedKeywords,
        extraKeywords,
        jobDescription
      });

      navigate('/optimized-resume', {
        state: {
          resumeText,
          jobDescription,
          unmatchedKeywords,
          matchPercentage: data.updatedMatchPercentage || resumeResults[pendingIndex]?.matchPercentage || 0,
          content: data.optimizedResume,
          highlightedContent: data.highlightedResume,
          insertedKeywords: data.insertedKeywords,
          removedKeywords: data.removedKeywords || [],
          previousState: state
        }
      });
    } catch (err) {
      console.error('Failed to optimize resume:', err.message);
      alert('Something went wrong while generating the optimized resume.');
    } finally {
      setLoadingIdx(null);
    }
  }}
>
  ✅ Confirm
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
