// ✅ ResumeUpload.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeUpload = () => {
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const parsed = parseResumeText(text); // Extracts structured data

      localStorage.setItem('uploadedResume', JSON.stringify(parsed));
      navigate('/resume-builder');
    };

    reader.readAsText(file);
  };

  // Basic mock parsing logic (replace with NLP/regex/AI as needed)
  const parseResumeText = (text) => {
    return {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(123) 456-7890',
      summary: 'A motivated professional with experience in React and Node.js',
      skills: 'React, JavaScript, HTML, CSS, Node.js',
      experience: [
        {
          company: 'Company A',
          role: 'Frontend Developer',
          duration: 'Jan 2021 - Dec 2022',
          description: 'Built responsive interfaces using React.js.'
        }
      ],
      education: [
        {
          institution: 'University X',
          degree: 'B.S. in Computer Science',
          year: '2020'
        }
      ]
    };
  };

  return (
    <div className="upload-section" style={{ padding: '2rem' }}>
      <h2>Upload Resume</h2>
      <input type="file" accept=".txt,.doc,.docx" onChange={handleFileUpload} />
    </div>
  );
};

export default ResumeUpload;
