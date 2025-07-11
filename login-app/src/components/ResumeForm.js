import React from 'react';

const ResumeForm = ({ data, onChange }) => {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...data.experience];
    updated[index][field] = value;
    updateField('experience', updated);
  };

  const addExperience = () => {
    updateField('experience', [...data.experience, { company: '', role: '', duration: '', description: '' }]);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...data.education];
    updated[index][field] = value;
    updateField('education', updated);
  };

  const addEducation = () => {
    updateField('education', [...data.education, { institution: '', degree: '', year: '' }]);
  };

  return (
    <div className="form-section">
      {/* ✅ Basic Info */}
      <label>Full Name</label>
      <input
        type="text"
        placeholder="John Doe"
        value={data.name}
        onChange={(e) => updateField('name', e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        placeholder="john@example.com"
        value={data.email}
        onChange={(e) => updateField('email', e.target.value)}
      />

      <label>Phone</label>
      <input
        type="text"
        placeholder="(123) 456-7890"
        value={data.phone}
        onChange={(e) => updateField('phone', e.target.value)}
      />

      {/* ✅ Summary */}
      <label>Professional Summary</label>
      <textarea
        placeholder="A motivated professional with experience in..."
        rows="4"
        value={data.summary}
        onChange={(e) => updateField('summary', e.target.value)}
      />

      {/* ✅ Skills */}
      <label>Skills (comma-separated)</label>
      <input
        type="text"
        placeholder="JavaScript, React, Node.js"
        value={data.skills}
        onChange={(e) => updateField('skills', e.target.value)}
      />

      {/* ✅ Experience */}
      <h3>Experience</h3>
      {data.experience.map((exp, idx) => (
        <div key={idx}>
          <label>Company</label>
          <input
            type="text"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
          />
          <label>Role</label>
          <input
            type="text"
            placeholder="Job Title"
            value={exp.role}
            onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
          />
          <label>Duration</label>
          <input
            type="text"
            placeholder="Jan 2021 - Dec 2023"
            value={exp.duration}
            onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)}
          />
          <label>Description</label>
          <textarea
            placeholder="Describe your work and achievements"
            rows="3"
            value={exp.description}
            onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addExperience}>+ Add Experience</button>

      {/* ✅ Education */}
      <h3>Education</h3>
      {data.education.map((edu, idx) => (
        <div key={idx}>
          <label>Institution</label>
          <input
            type="text"
            placeholder="University Name"
            value={edu.institution}
            onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
          />
          <label>Degree</label>
          <input
            type="text"
            placeholder="Bachelor of Science"
            value={edu.degree}
            onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
          />
          <label>Year</label>
          <input
            type="text"
            placeholder="2020"
            value={edu.year}
            onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addEducation}>+ Add Education</button>
    </div>
  );
};

export default ResumeForm;
