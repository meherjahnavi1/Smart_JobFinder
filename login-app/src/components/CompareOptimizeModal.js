// src/components/CompareOptimizeModal.js
import React from 'react';
import './CompareOptimizeModal.css'; // optional custom styles

const CompareOptimizeModal = ({ job, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content-custom">
        <h2>🎯 Resume Optimization Preview</h2>
        <p>Based on your resume and this job at <strong>{job.employer_name}</strong></p>

        {/* Compare Results */}
        <div className="compare-block">
          <h3>📝 Compare Result</h3>
          <p><strong>Job Title:</strong> {job.job_title}</p>
          <p><strong>Match Score:</strong> {job.matchPercentage}%</p>
          <p className="text-sm text-gray-600">{job.job_description.slice(0, 200)}...</p>
        </div>

        {/* Optimized Resume Preview */}
        <div className="resume-block-preview">
          <h3>🚀 Optimized Resume Preview</h3>
          <ul className="resume-preview-list">
            <li>✅ Keywords added intelligently</li>
            <li>✅ Experience section updated</li>
            <li>✅ Skill set matched with JD</li>
            <li>✅ Format remains professional</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="modal-buttons-custom">
          <button onClick={onClose} className="btn-cancel">Go Back</button>
          <button
            className="btn-confirm"
            onClick={() => {
              window.location.href = '/optimized-resume';
            }}
          >
            View Full Optimized Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareOptimizeModal;