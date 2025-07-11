import React from "react";
import "./styles/Template1.css";

// Helper functions
const getYear = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear();
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
};

const Template1 = ({ data }) => {
  if (!data || !data.personal) return <div>Loading or Invalid Resume Data</div>;

  const {
    personal = {},
    education = [],
    skills = [],
    experience = [],
    projects = [],
  } = data;

  return (
    <div className="cvb-template1-container">
      <div className="cvb-template1-header">
        <div className="cvb-template1-name-title">
          <h1 className="cvb-template1-name">{personal.fullName || "Full Name"}</h1>
          <p className="cvb-template1-title">{experience[0]?.job_title || "Job Title"}</p>
        </div>
      </div>

      <div className="cvb-template1-content">
        <div className="cvb-template1-left">
          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading red">ABOUT ME</h3>
            <p>{personal.summary || "No summary provided."}</p>
          </section>

          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading red">EXPERIENCE</h3>
            <ul>
              {experience.length > 0 ? (
                experience.map((exp, index) => (
                  <li key={index}>
                    <p><strong>{exp.job_title}</strong></p>
                    <p>{exp.company_name}</p>
                    <p>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</p>
                  </li>
                ))
              ) : (
                <li>No experience listed.</li>
              )}
            </ul>
          </section>

          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading red">PROJECTS</h3>
            <ul>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <li key={index}>
                    <p><strong>{project.project_title}</strong></p>
                    <p>{project.description}</p>
                  </li>
                ))
              ) : (
                <li>No projects listed.</li>
              )}
            </ul>
          </section>

          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading red">SKILLS</h3>
            <ul>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <li key={index}><strong>{skill.skill_name}</strong> - {skill.level}</li>
                ))
              ) : (
                <li>No skills listed.</li>
              )}
            </ul>
          </section>
        </div>

        <div className="cvb-template1-right">
          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading right">CONTACTS</h3>
            <p><strong>Phone:</strong> {personal.phone || "N/A"}</p>
            <p><strong>Address:</strong> {personal.address || "N/A"}</p>
            <p><strong>LinkedIn:</strong> <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">{personal.linkedin || "N/A"}</a></p>
            <p><strong>GitHub:</strong> <a href={personal.github} target="_blank" rel="noopener noreferrer">{personal.github || "N/A"}</a></p>
          </section>

          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading right">PERSONAL</h3>
            <p><strong>Marital Status:</strong> Married</p>
            <p><strong>Birthday:</strong> 1-1-2000</p>
            <p><strong>Religion:</strong> Hindu</p>
          </section>

          <section className="cvb-template1-section">
            <h3 className="cvb-template1-heading right">EDUCATION</h3>
            <ul>
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <li key={index}>
                    <p><strong>{edu.degree}</strong></p>
                    <p>{edu.institution}</p>
                    <p>{getYear(edu.startDate)} - {getYear(edu.endDate)}</p>
                  </li>
                ))
              ) : (
                <li>No education listed.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1;
