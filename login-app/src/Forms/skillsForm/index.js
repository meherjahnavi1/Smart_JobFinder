import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillsForm = ({ onNext, onBack, editData }) => {
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setSkills(editData.skills || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      skills,
    };
    console.log('Collected Skills:', formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Skills</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      {/* Skill Input */}
      <textarea
        rows={4}
        placeholder="List your skills (e.g., JavaScript, SQL, React, Python)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
        required
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

export default SkillsForm;
