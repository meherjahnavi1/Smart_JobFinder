// src/api/cvDetailsApi.js

const API_BASE_URL = 'http://localhost:3001/api/cv-details'; // Change if needed

// Save personal info
export const savePersonalInfo = async (userId, personalInfo) => {
  const response = await fetch(`${API_BASE_URL}/personal-info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, personalInfo }),
  });
  return await response.json();
};

// Save education details
export const addEducationDetails = async (userId, education) => {
  const response = await fetch(`${API_BASE_URL}/education`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, education }),
  });
  return await response.json();
};

// Save experience details
export const addExperienceDetails = async (userId, experiences) => {
  const response = await fetch(`${API_BASE_URL}/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, experiences }),
  });
  return await response.json();
};

// Save skills
export const addSkills = async (userId, skills) => {
  const response = await fetch(`${API_BASE_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, skills }),
  });
  return await response.json();
};

// Save projects
export const addProjects = async (userId, projects) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, projects }),
  });
  return await response.json();
};

// Save certifications
export const addCertifications = async (userId, certifications) => {
  const response = await fetch(`${API_BASE_URL}/certifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, certifications }),
  });
  return await response.json();
};

// Update password
export const updatePassword = async (userId, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/update-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, newPassword }),
  });
  return await response.json();
};
