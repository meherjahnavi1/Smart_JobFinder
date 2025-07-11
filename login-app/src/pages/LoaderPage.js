// src/pages/LoaderPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Animation - 1748459296146.json';

function LoaderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 100));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      navigate('/compare', {
        state: {
          jobDescription: location.state?.jobDescription,
          resumeFiles: location.state?.resumeFiles || [],
        },
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate, location]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `url('/images/dashboard-bg.jpg') no-repeat center center / cover`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ width: 250 }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <h3 style={{ color: '#1e293b', marginTop: '1rem' }}>Analyzing Resumes...</h3>

      {/* Smooth Animated Progress Bar */}
      <div
        style={{
          width: '80%',
          height: '10px',
          backgroundColor: '#e5e7eb',
          borderRadius: '8px',
          marginTop: '1rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#3b82f6',
            transition: 'width 0.5s ease-in-out',
          }}
        />
      </div>

      {/* Animated Cancel Button */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginTop: '1.5rem',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.9rem',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Cancel & Return to Dashboard
      </button>
    </div>
  );
}

export default LoaderPage;
