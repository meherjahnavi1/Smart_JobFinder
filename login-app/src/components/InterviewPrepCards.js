// src/components/InterviewPrepCards.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterviewPrepCards.css';

const interviewRoles = [
  { title: 'Software Engineer', messages: '120.5K', image: '/images/software.png' },
  { title: 'Data Scientist', messages: '65.3K', image: '/images/data_scientist.png' },
  { title: 'Cybersecurity', messages: '37.1K', image: '/images/cybersecurity.png' },
  { title: 'Product Manager', messages: '25.9K', image: '/images/product_manager.png' },
  { title: 'DevOps Engineer', messages: '20.5K', image: '/images/Dev_ops.png' },
  { title: 'Full Stack Developer', messages: '12.5K', image: '/images/fullstack.png' },
  { title: 'Data Engineer', messages: '32.5K', image: '/images/data_scientist.png' },
  { title: 'Cloud Architect', messages: '10.5K', image: '/images/HR.png' },
];

const InterviewPrepCards = ({ onStartPrep }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleStartPrep = (role) => {
    setSelectedRole(role);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    if (onStartPrep) {
      onStartPrep(selectedRole);
    } else {
      navigate('/interview-bot', {
        state: {
          roleTitle: selectedRole.title,
          preferences: {
            level: 'Mid-Level',
            topics: [],
            strengths: [],
            gaps: [],
            email: localStorage.getItem('userEmail') || '',
          },
        },
      });
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedRole(null);
  };

  return (
    <div className="interview-section dark-theme">
      <h2 className="section-heading">🎯 Interview Prep for Top Tech Roles</h2>
      <div className="card-grid">
        {interviewRoles.map((role, index) => (
          <div className="role-card" key={index}>
          <img src={role.image} alt={role.title} className="role-img" />
            <div className="role-details">
              <h3>{role.title}</h3>
              <p>{role.messages} messages</p>
              <button onClick={() => handleStartPrep(role)} className="start-btn">
                Start your prep
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>👋 Ready to Practice for {selectedRole?.title}?</h3>
            <p>This AI-powered bot will ask you real-time voice-based questions!</p>
            <div className="popup-actions">
              <button onClick={handleCancel} className="cancel-btn">Go Back</button>
              <button onClick={handleConfirm} className="confirm-btn">Start Interview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrepCards;