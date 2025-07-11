import axios from 'axios';

export const sendResetOtp = async (email) => {
  return axios.post('http://localhost:3001/api/send-otp', { email });
};

export const verifyResetOtp = async (email, otp, token) => {
  return axios.post('http://localhost:3001/api/verify-otp', { email, otp }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePassword = async ({ resetToken, newPassword }) => {
  return axios.post(
    'http://localhost:3001/api/reset-password',
    { password: newPassword },
    { headers: { Authorization: `Bearer ${resetToken}` } }
  );
};

// Existing loginUser export (if you already had it)
export const loginUser = async (email, password) => {
  return axios.post('http://localhost:3001/api/login', { email, password });
};
