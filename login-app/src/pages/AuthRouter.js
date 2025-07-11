// src/pages/AuthPage.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Register from './Registration';
import '../pages/AuthPage.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const navigate = useNavigate();

  const switchTab = (tab) => setActiveTab(tab);

  const handleRedirectAfterRegister = () => {
    navigate('/auth/confirm');
  };

  return (
    <div className="auth-video-container">
      <video autoPlay muted loop className="auth-bg-video">
        <source src="/videos/pressman.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="auth-overlay">
        <div className="auth-box">
          <h2 className="title">Get Started</h2>
          <div className="tabs">
            <button
              className={activeTab === 'login' ? 'tab active' : 'tab'}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button
              className={activeTab === 'register' ? 'tab active' : 'tab'}
              onClick={() => switchTab('register')}
            >
              Register
            </button>
          </div>

          <div className="form-content">
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={activeTab}
                timeout={300}
                classNames="fade-slide"
                unmountOnExit
                nodeRef={activeTab === 'login' ? loginRef : registerRef}
              >
                <div ref={activeTab === 'login' ? loginRef : registerRef}>
                  {activeTab === 'login' ? (
                    <Login onSwitchToRegister={() => switchTab('register')} />
                  ) : (
                    <Register
                      onSwitchToLogin={() => switchTab('login')}
                      onRegisterSuccess={handleRedirectAfterRegister}
                    />
                  )}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
