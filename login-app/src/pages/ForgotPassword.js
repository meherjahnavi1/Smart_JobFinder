// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../aws/auth';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await forgotPassword(username);
      setStatus('success');
      setMessage('✔️ A reset code has been sent to your email.');
      setTimeout(() => {
        navigate('/reset-password', { state: { username } });
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage('❌ ' + error.message);
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.background}></div>

      <div style={styles.contentWrapper}>
        <form onSubmit={handleSubmit} style={styles.card}>
          <h2 style={styles.title}>Forgot Password</h2>
          <p style={styles.subtitle}>Enter your email or username to receive a reset code.</p>

          <input
            type="text"
            placeholder="Email or Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Reset Code'}
          </button>

          {message && (
            <p
              style={{
                ...styles.message,
                color: status === 'success' ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/auth" style={styles.link}>
              ← Back to Get Started
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  background: {
    backgroundImage: `url('/pexels.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(6px)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontSize: '1.6rem',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  link: {
    color: '#007BFF',
    fontSize: '0.9rem',
    textDecoration: 'none',
  },
};

export default ForgotPassword;
