import React from 'react';
import './styles/Template4.css';

// Helper functions
const getYear = (date) => {
  if (!date) return '';
  return new Date(date).getFullYear();
};

const convertDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
};

const Template4 = ({ data }) => {
  const { personal, education, skills, experience, projects } = data;

  return (
    <div className="cvb-first-resume-container">
      <div className="cvb-first-sidebar">
        <div className="cvb-first-contact">
          <p className="cvb-first-contact-item">{personal.address}</p>
          <p className="cvb-first-contact-item">Tel: {personal.phone}</p>
          <p className="cvb-first-contact-item">Email: {personal.email || "example@email.com"}</p>
          <p className="cvb-first-contact-item">Website: {personal.linkedin}</p>
        </div>

        <div className="cvb-first-social">
          <p className="cvb-first-social-text">Slack / Trello / GitHub / LinkedIn</p>
        </div>

        <div className="cvb-first-section">
          <h3 className="cvb-first-section-heading">Project Management</h3>
          <p className="cvb-first-section-content">Jira<br />Slack<br />Trello</p>
        </div>

        <div className="cvb-first-section">
          <h3 className="cvb-first-section-heading">Design & Coding</h3>
          <p className="cvb-first-section-content">
            HTML, CSS<br />
            JavaScript, jQuery<br />
            Angular, React, Ember<br />
            Responsive UI design<br />
            WordPress<br />
            Adobe Photoshop<br />
            Visual Studio
          </p>
        </div>
      </div>

      <div className="cvb-first-main-content">
        <h1 className="cvb-first-name">{personal.fullName}</h1>
        <h2 className="cvb-first-role">{experience[0]?.job_title}</h2>

        <section className="cvb-first-profile-section">
          <h3 className="cvb-first-section-title">Profile</h3>
          <p className="cvb-first-paragraph">
            {personal.summary}
          </p>
        </section>

        <section className="cvb-first-experience-section">
          <h3 className="cvb-first-section-title">Experience</h3>
          {experience.map((job, index) => (
            <div key={index} className="cvb-first-job">
              <h4 className="cvb-first-job-title">{job.job_title}</h4>
              <span className="cvb-first-job-duration">{convertDate(job.start_date)} - {convertDate(job.end_date)}</span>
              <p className="cvb-first-job-location">{job.location}</p>
              <ul className="cvb-first-job-list">
                <li className="cvb-first-job-item">{job.description}</li>
              </ul>
            </div>
          ))}
        </section>

        <section className="cvb-first-education-section">
          <h3 className="cvb-first-section-title">Education</h3>
          {education.map((edu, index) => (
            <div key={index}>
              <p className="cvb-first-paragraph">
                <strong>{edu.degree}</strong> – {edu.institution}<br />
                {convertDate(edu.startDate)} – {convertDate(edu.endDate)}
              </p>
              <p className="cvb-first-paragraph">{edu.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Template4;
