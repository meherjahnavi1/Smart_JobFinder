import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectsForm = ({ onNext, onBack, editData }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setProjectTitle(editData.projectTitle || '');
      setProjectDescription(editData.projectDescription || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      projectTitle,
      projectDescription,
    };
    console.log('Collected Projects:', formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Projects</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      {/* Project Fields */}
      <input
        type="text"
        placeholder="Project Title"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
        required
      />
      <textarea
        rows={4}
        placeholder="Project Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#8247ff] text-white px-6 py-2 rounded-md hover:bg-[#6f3fdb]"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ProjectsForm;
