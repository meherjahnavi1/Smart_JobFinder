import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EducationDetails = ({ onNext, onBack, editData }) => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setDegree(editData.degree || '');
      setInstitution(editData.institution || '');
      setYear(editData.year || '');
      setGrade(editData.grade || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      degree,
      institution,
      year,
      grade,
    };
    console.log('Collected Education Details:', formData);
    // Optional: Save to context or localStorage here
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Education Details</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Enter institution name"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Year of completion"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Grade / Percentage"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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
      </div>
    </form>
  );
};

export default EducationDetails;
