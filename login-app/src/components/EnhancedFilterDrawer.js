// src/components/EnhancedFilterDrawer.js
import React, { useState } from 'react';

const EnhancedFilterDrawer = ({ showFilters, toggleFilters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    jobFunction: '',
    jobTypes: [],
    workModels: [],
    location: '',
    experienceLevels: [],
    yearsExperience: 0,
    salary: '',
    h1b: false,
    clearance: false,
    citizenOnly: false,
    interests: []
  });

  const handleCheckboxChange = (field, value) => {
    setLocalFilters((prev) => {
      const updated = prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdateFilters = () => {
    onFilterChange(localFilters);
    toggleFilters();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform duration-300 z-50 overflow-y-auto ${
        showFilters ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-bold">🔍 Advanced Filters</h2>

        {/* Basic Job Criteria */}
        <div>
          <h3 className="font-semibold mb-2">Basic Job Criteria</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium">Job Function</label>
            <input
              type="text"
              name="jobFunction"
              value={localFilters.jobFunction}
              onChange={handleInputChange}
              placeholder="e.g., Data Analyst"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm font-medium">Job Type</label>
            <label className="text-sm font-medium">Work Model</label>
            <div className="space-y-1">
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={localFilters.jobTypes.includes(type)}
                    onChange={() => handleCheckboxChange('jobTypes', type)}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div className="space-y-1">
              {['Onsite', 'Remote', 'Hybrid'].map((model) => (
                <label key={model}>
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={localFilters.workModels.includes(model)}
                    onChange={() => handleCheckboxChange('workModels', model)}
                  />
                  {model}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={localFilters.location}
            onChange={handleInputChange}
            placeholder="Within US"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium">Experience Level</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {['Intern/New Grad', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead/Staff', 'Director/Exec'].map((level) => (
              <label key={level} className="text-sm">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={localFilters.experienceLevels.includes(level)}
                  onChange={() => handleCheckboxChange('experienceLevels', level)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Required Experience */}
        <div>
          <label className="block text-sm font-medium">Required Experience (years): {localFilters.yearsExperience}</label>
          <input
            type="range"
            name="yearsExperience"
            value={localFilters.yearsExperience}
            onChange={handleInputChange}
            min="0"
            max="20"
            step="1"
            className="w-full mt-1"
          />
        </div>

        {/* Compensation & Sponsorship */}
        <div>
          <h3 className="font-semibold mb-2">Compensation & Sponsorship</h3>
          <label className="block text-sm font-medium">Minimum Annual Salary ($)</label>
          <input
            type="number"
            name="salary"
            value={localFilters.salary}
            onChange={handleInputChange}
            placeholder="0"
            className="w-full mt-1 p-2 border rounded"
          />

          <label className="block mt-3 text-sm font-medium">
            <input
              type="checkbox"
              name="h1b"
              checked={localFilters.h1b}
              onChange={handleInputChange}
              className="mr-2"
            />
            H1B Sponsorship
          </label>

          <label className="block mt-2 text-sm font-medium">
            <input
              type="checkbox"
              name="clearance"
              checked={localFilters.clearance}
              onChange={handleInputChange}
              className="mr-2"
            />
            Security Clearance Required
          </label>

          <label className="block mt-2 text-sm font-medium">
            <input
              type="checkbox"
              name="citizenOnly"
              checked={localFilters.citizenOnly}
              onChange={handleInputChange}
              className="mr-2"
            />
            US Citizen Only
          </label>
        </div>

        {/* Areas of Interest */}
        <div>
          <label className="block text-sm font-medium">Industry / Interests</label>
          <select
            multiple
            name="interests"
            value={localFilters.interests}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, (option) => option.value);
              setLocalFilters((prev) => ({ ...prev, interests: selected }));
            }}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>Information Technology</option>
            <option>Artificial Intelligence (AI)</option>
            <option>Financial Services</option>
            <option>Healthcare</option>
            <option>Consulting</option>
            <option>Retail</option>
          </select>
        </div>

        <button
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleUpdateFilters}
        >
          Update Filters
        </button>

        <button
          className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={toggleFilters}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EnhancedFilterDrawer;