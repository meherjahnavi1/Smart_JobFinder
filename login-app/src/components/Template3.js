import React from "react";
import "./styles/Template3.css";

// Local helper functions
const getYear = (date) => {
  if (!date) return '';
  return new Date(date).getFullYear();
};

const convertDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
};

const Template3 = ({ data }) => {
  const { personal, education, skills, experience, projects } = data;

  return (
    <div className="cvb-william-resume">
      <div className="cvb-william-header">
        <h3 className="cvb-william-position">{experience[0]?.job_title}</h3>
        <h1 className="cvb-william-name">{personal.fullName}</h1>
        <p className="cvb-william-summary">{personal.summary}</p>
        <div className="cvb-william-contacts">
          <p className="cvb-william-contact-item">
            <strong>EMAIL</strong><br />
            <span className="cvb-william-contact-value">{personal.email || "example@email.com"}</span>
          </p>
          <p className="cvb-william-contact-item">
            <strong>PHONE</strong><br />
            <span className="cvb-william-contact-value">{personal.phone}</span>
          </p>
          <p className="cvb-william-contact-item">
            <strong>LINKEDIN</strong><br />
            <span className="cvb-william-contact-value">{personal.linkedin}</span>
          </p>
        </div>
      </div>

      <div className="cvb-william-section">
        <h2 className="cvb-william-section-title">WORK HISTORY</h2>
        {experience.map((exp, index) => (
          <div key={index}>
            <h3 className="cvb-william-job-title">{exp.job_title}</h3>
            <span className="cvb-william-company">{exp.company}</span>
            <span className="cvb-william-dates">{convertDate(exp.start_date)} - {convertDate(exp.end_date)}</span>
            <ul className="cvb-william-job-list">
              <li className="cvb-william-job-item">{exp.description}</li>
            </ul>
          </div>
        ))}
      </div>

      <div className="cvb-william-section">
        <h2 className="cvb-william-section-title">PROJECTS</h2>
        {projects.map((project, index) => (
          <div key={index}>
            <h3 className="cvb-william-job-title">{project.project_title}</h3>
            <span className="cvb-william-company">{project.project_description}</span>
            <ul className="cvb-william-job-list">
              <li className="cvb-william-job-item">{project.description}</li>
            </ul>
          </div>
        ))}
      </div>

      <div className="cvb-william-section">
        <h2 className="cvb-william-section-title">EDUCATION</h2>
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="cvb-william-edu-degree">{edu.degree}</h3>
            <p className="cvb-william-edu-details">
              {edu.institution}<br />
              <span className="cvb-william-dates">{getYear(edu.startDate)} - {getYear(edu.endDate)}</span>
            </p>
            <p className="cvb-william-edu-sub">{edu.description}</p>
          </div>
        ))}
      </div>

      <div className="cvb-william-section">
        <h2 className="cvb-william-section-title">SKILLS</h2>
        <ul className="cvb-william-skills">
          {skills.map((skill, index) => (
            <li key={index} className="cvb-william-skill-item">
              <strong>{skill.skill_name}</strong> - {skill.level}
            </li>
          ))}
          <li className="cvb-william-skill-item">Personable & Friendly Demeanor</li>
          <li className="cvb-william-skill-item">Sales & Negotiation Skills</li>
          <li className="cvb-william-skill-item">CRM Software (e.g., Salesforce, HubSpot)</li>
          <li className="cvb-william-skill-item">Excellent Communication</li>
          <li className="cvb-william-skill-item">Client Relationship Maintenance</li>
        </ul>
      </div>

      <div className="cvb-william-section">
        <h2 className="cvb-william-section-title">COURSES</h2>
        <ul className="cvb-william-courses">
          <li className="cvb-william-course-item">
            <strong className="cvb-william-course-title">Certified Business Relationship Manager (CBRM)</strong><br />
            <span className="cvb-william-course-date">2017-05</span>
          </li>
          <li className="cvb-william-course-item">
            <strong className="cvb-william-course-title">NAHU Benefits Account Manager Certification (BAMC)</strong><br />
            <span className="cvb-william-course-date">2014-11</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Template3;
