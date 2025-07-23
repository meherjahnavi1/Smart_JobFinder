// InterviewPrepPage.js (updated full working code with dropdown + close functionality)
import React, { useState } from 'react';
import InterviewPrepCards from '../components/InterviewPrepCards';
import InterviewBot from '../components/InterviewBot';

const InterviewPrepPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleStartPrep = (role) => {
    const preferences = {
      role,
      interviewDate,
      resumeFile,
      experienceLevel,
    };
    setSelectedRole(preferences);
  };

  const handleDateChange = (e) => setInterviewDate(e.target.value);
  const handleResumeUpload = (e) => setResumeFile(e.target.files[0]);
  const handleLevelSelect = (e) => setExperienceLevel(e.target.value);

  return (
    <div className="min-h-screen bg-gray-900 px-6 pt-10 pb-20 text-white relative">
      <h1 className="text-3xl font-bold mb-2 text-center">
        🚀 Get Ready for Your Interview!
      </h1>
      <div className="flex justify-center mb-6 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-700 px-4 py-2 rounded text-white font-semibold shadow"
        >
          🎯 Customize Your Interview Prep ▾
        </button>

        {showDropdown && (
          <div className="absolute top-12 bg-white text-black p-5 rounded shadow-xl w-80 z-50">
            <button
              onClick={() => setShowDropdown(false)}
              className="absolute top-2 right-3 text-lg text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <label className="block mt-2 text-sm font-semibold">Period of Interview:</label>
            <input
              type="date"
              onChange={handleDateChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />

            <label className="block mt-4 text-sm font-semibold">Upload Resume (optional):</label>
            <input
              type="file"
              onChange={handleResumeUpload}
              className="w-full mt-1 p-1"
            />

            <label className="block mt-4 text-sm font-semibold">Experience Level:</label>
            <select
              onChange={handleLevelSelect}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select (optional)</option>
              <option value="beginner">Beginner</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        )}
      </div>

      {!selectedRole ? (
        <InterviewPrepCards onStartPrep={handleStartPrep} />
      ) : (
        <InterviewBot role={selectedRole.role} preferences={selectedRole} />
      )}
    </div>
  );
};

export default InterviewPrepPage;
