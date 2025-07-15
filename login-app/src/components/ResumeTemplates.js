import React from 'react';
import './ResumeTemplates.css';

const templates = [
  {
    title: 'Junior',
    experience: '1–3 years of experience',
    image: '/templates/junior.png', // Save image in public/templates/
  },
  {
    title: 'Senior',
    experience: '3–7+ years of experience',
    image: '/templates/senior.png',
  },
  {
    title: 'Executive',
    experience: '10+ years of experience',
    image: '/templates/executive.png',
  },
  {
    title: 'Intern',
    experience: 'Entry-level internship',
    image: '/templates/intern.png',
  },
];

const ResumeTemplates = () => {
  return (
    <div className="template-section">
      <h2 className="template-title">Choose a Resume Template</h2>
      <div className="template-grid">
        {templates.map((t, index) => (
          <div key={index} className="template-card">
            <img src={t.image} alt={`${t.title} Template`} />
            <h3>{t.title}</h3>
            <p>{t.experience}</p>
          </div>
        ))}
      </div>
      <button className="upload-resume-button">UPLOAD RESUME</button>
    </div>
  );
};

export default ResumeTemplates;
