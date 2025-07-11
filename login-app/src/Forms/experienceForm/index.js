import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExperienceForm = ({ onNext, onBack, editData }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setJobTitle(editData.jobTitle || '');
      setCompany(editData.company || '');
      setStartDate(editData.startDate || '');
      setEndDate(editData.endDate || '');
      setDescription(editData.description || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      jobTitle,
      company,
      startDate,
      endDate,
      description,
    };
    console.log('Collected Experience:', formData);
    // Optional: Save to context/localStorage
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Work Experience</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      {/* Fields */}
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
        required
      />
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
      />
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
      </div>
      <textarea
        rows={4}
        placeholder="Job responsibilities or achievements"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

export default ExperienceForm;
