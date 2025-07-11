import React from "react";
import "./styles/Template2.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaBehance, FaPhoneAlt, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { getYear, convertDate } from "../utils/DateModifications";

const CVTemplate2 = ({ cvData }) => {
  if (!cvData || !cvData.personal) return <div>Loading or Invalid Resume Data</div>;

  const {
    personal = {},
    education = [],
    skills = [],
    experience = [],
    projects = [],
  } = cvData;

  return (
    <div className="cvb-second-resume-a4">
      <div className="cvb-second-header">
        <div className="cvb-second-info">
          <h1 className="cvb-second-name">{personal.fullName || "Full Name"}</h1>
          <p className="cvb-second-desc">{personal.summary || "No summary provided."}</p>

          <div className="cvb-second-social">
            <span><FaBehance /> Behance</span>
            <span><FaInstagram /> Instagram</span>
            <span><FaTwitter /> Twitter</span>
            <span><FaFacebookF /> Facebook</span>
          </div>
        </div>
      </div>

      <div className="cvb-second-content">
        <div className="cvb-second-left">
          <section>
            <h2 className="cvb-second-section-title">CONTACT</h2>
            <p className="cvb-second-contact"><FaMapMarkerAlt /> {personal.address || "N/A"}</p>
            <p className="cvb-second-contact"><FaPhoneAlt /> {personal.phone || "N/A"}</p>
            <p className="cvb-second-contact"><FaGlobe /> {personal.linkedin || "N/A"}</p>
          </section>

          <section>
            <h2 className="cvb-second-section-title">PROJECTS</h2>
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
        </div>

        <div className="cvb-second-right">
          <section>
            <h2 className="cvb-second-section-title">EXPERIENCE</h2>
            <ul>
              {experience.length > 0 ? (
                experience.map((exp, index) => (
                  <li className="cvb-second-education" key={index}>
                    <strong>{exp.job_title}</strong>
                    <p>{exp.company_name}</p>
                    <p>{convertDate(exp.start_date)} - {convertDate(exp.end_date)}</p>
                  </li>
                ))
              ) : (
                <li>No experience listed.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="cvb-second-section-title">EDUCATION</h2>
            <ul>
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <li className="cvb-second-education" key={index}>
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

          <section>
            <h2 className="cvb-second-section-title">SKILLS | EXPERTISE</h2>
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
      </div>
    </div>
  );
};

export default CVTemplate2;
