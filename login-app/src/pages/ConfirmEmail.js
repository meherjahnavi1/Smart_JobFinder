// src/pages/ConfirmEmail.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmUser, resendConfirmationCode } from '../aws/auth';
import './AuthPage.css';

function ConfirmEmail() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmUser(username, code);
      setMessage('✅ Your email has been successfully verified! Redirecting to login...');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (error) {
      if (error.message.includes("Current status is CONFIRMED")) {
        setMessage('✅ Your email is already verified! Redirecting to login...');
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } else {
        setMessage('❌ Verification failed: ' + error.message);
      }
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(username);
      setMessage('✅ Verification code resent to your email.');
    } catch (error) {
      setMessage('❌ Failed to resend code: ' + error.message);
    }
  };

  return (
    <div className="form-section">
      <h3 style={{ color: 'black' }}>Verify Email</h3>
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          placeholder="Enter your username or email"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className="black-button" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>
      <button
        onClick={handleResendCode}
        className="google-button"
        style={{ marginTop: '10px' }}
        disabled={!username}
      >
        Resend Code
      </button>
      {message && (
        <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ConfirmEmail;
