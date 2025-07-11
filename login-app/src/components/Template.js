import { getYear, convertDate } from "../utils/DateModifications";
import "./styles/CVTemplate.css";

const CVTemplate = ({ cvData }) => {
  const { personal, education, skills, experience, projects } = cvData;

  return (
    <>
      {/* Personal Info */}
      {personal && (
        <section className="cvb-preview-section">
          <h2>{personal.fullName}</h2>
          <p>
            <strong>Phone:</strong> {personal.phone}
          </p>
          <p>
            <strong>Address:</strong> {personal.address}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {personal.linkedin}
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              {personal.github}
            </a>
          </p>
        </section>
      )}

      {/* Summary */}
      {personal && (
        <section className="cvb-preview-section">
          <h3>Summary</h3>
          <p>{personal.summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="cvb-preview-section">
          <h3>Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="cvb-preview-card">
              <h4>
                {edu.degree} in {edu.field}
              </h4>
              <p>{edu.institution}</p>
              <p>
                {getYear(edu.startDate)} - {getYear(edu.endDate)}
              </p>
              <p>CGPA/Percentage: {edu.percentage}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="cvb-preview-section">
          <h3>Skills</h3>
          <ul className="cvb-skill-list">
            {skills.map((skill, i) => (
              <li key={i}>
                <strong>{skill.skill_name}</strong> - {skill.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="cvb-preview-section">
          <h3>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="cvb-preview-card">
              <h4>
                {exp.job_title} at {exp.company_name}
              </h4>
              <p>
                {convertDate(exp.start_date)} - {convertDate(exp.end_date)}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="cvb-preview-section">
          <h3>Projects</h3>
          {projects.map((project, i) => (
            <div key={i} className="cvb-preview-card">
              <h4>{project.project_title}</h4>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </div>
          ))}
        </section>
      )}

      {/* Declaration */}
      {personal && (
        <section className="cvb-preview-section">
          <h3>Declaration</h3>
          <p>{personal.declaration}</p>
        </section>
      )}
    </>
  );
};

export default CVTemplate;
