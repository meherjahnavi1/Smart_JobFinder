import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { loginUser } from '../aws/auth'; // AWS Cognito login function
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AuthPage.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUsername');
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(username, password);
      console.log("Login success:", result);

      // ✅ Log the access token (JWT)
      console.log("Access token:", result.getAccessToken().getJwtToken());

      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      navigate('/dashboard');
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="form-section">
      <h3 style={{ color: 'black' }}>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
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
              color: '#555',
            }}
          ></i>
        </div>

        <div className="auth-options-row">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/forgot-password" style={{ fontSize: '14px' }}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="black-button">Login</button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-button"
        >
          <i className="fab fa-google" style={{ marginRight: '8px' }}></i>
          Sign in with Google
        </button>

        <div className="bottom-text">
          Don’t have an account?{' '}
          <span
            className="auth-link"
            onClick={() => document.getElementById('register-tab')?.click()}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
