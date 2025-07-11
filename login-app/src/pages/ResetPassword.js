import React, { useState } from 'react';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [matchError, setMatchError] = useState('');

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    evaluatePasswordStrength(password);
    if (confirmPassword && password !== confirmPassword) {
      setMatchError('Passwords do not match');
    } else {
      setMatchError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    if (newPassword !== password) {
      setMatchError('Passwords do not match');
    } else {
      setMatchError('');
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      strength = 'Strong';
    } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = 'Moderate';
    }
    setPasswordStrength(strength);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="form-section">
      <h3 style={{ color: 'black' }}>Reset Password</h3>
      <form>
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <i
            className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={toggleNewPasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555'
            }}
          ></i>
          {passwordStrength && (
            <p style={{ marginTop: '0.5rem', color: passwordStrength === 'Strong' ? 'green' : passwordStrength === 'Moderate' ? 'orange' : 'red' }}>
              Strength: {passwordStrength}
            </p>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <i
            className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={toggleConfirmPasswordVisibility}
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

        {matchError && (
          <p style={{ color: 'red', marginTop: '0.5rem' }}>{matchError}</p>
        )}

        <button type="submit" className="black-button" style={{ marginTop: '1rem' }}>Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
