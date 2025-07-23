import React from 'react';
import './InterviewInstructionModal.css';

const InterviewInstructionModal = ({ onClose, onStart }) => {
  return (
    <div className="instruction-modal-overlay">
      <div className="instruction-modal">
        <h2>🎙️ Interview Instructions</h2>
        <ul>
          <li>✅ Answer confidently</li>
          <li>🎯 Use relevant technical keywords</li>
          <li>⏱️ Keep it brief and clear (30-60s)</li>
          <li>📢 Speak clearly for voice recognition</li>
        </ul>
        <div className="modal-buttons">
          <button onClick={onStart} className="start-btn">Start Interview</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewInstructionModal;
