import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signInWithPopup } from 'firebase/auth';
import { registerUser } from '../aws/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // ✅ Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser(username, email, password);
      alert("Registration successful! Please verify your email.");
      navigate('/auth/confirm'); // ✅ REDIRECT TO CONFIRM PAGE
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In Success:', user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="form-section">
      <h3 style={{ color: 'black' }}>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555'
            }}
          ></i>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555'
            }}
          ></i>
        </div>

        <button type="submit">Register</button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-button"
        >
          <i className="fab fa-google" style={{ marginRight: '8px' }}></i>
          Sign up with Google
        </button>

        <div className="bottom-text">
          Already have an account?{' '}
          <span className="auth-link" onClick={onSwitchToLogin}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
