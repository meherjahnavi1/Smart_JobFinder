// src/components/JobFiltersDrawer.js
import React, { useState } from 'react';

const JobFiltersDrawer = ({ isOpen, onClose }) => {
  const [jobFunction, setJobFunction] = useState('Data Analyst');
  const [jobTypes, setJobTypes] = useState({ fullTime: true, partTime: false, contract: false, internship: false });
  const [workModels, setWorkModels] = useState({ onsite: true, remote: true, hybrid: true });
  const [location, setLocation] = useState('Within US');
  const [radius, setRadius] = useState('25mi');

  const toggleJobType = (type) => {
    setJobTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleWorkModel = (model) => {
    setWorkModels((prev) => ({ ...prev, [model]: !prev[model] }));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">&times;</button>
        </div>

        {/* Basic Job Criteria */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Basic Job Criteria</h3>

          {/* Job Function */}
          <label className="block mb-2 font-medium">Job Function</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            value={jobFunction}
            onChange={(e) => setJobFunction(e.target.value)}
          />

          {/* Job Type */}
          <label className="block mb-2 font-medium">Job Type</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['fullTime', 'partTime', 'contract', 'internship'].map((type) => (
              <button
                key={type}
                className={`px-3 py-2 border rounded ${
                  jobTypes[type] ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => toggleJobType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          {/* Work Model */}
          <label className="block mb-2 font-medium">Work Model</label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['onsite', 'remote', 'hybrid'].map((model) => (
              <button
                key={model}
                className={`px-3 py-2 border rounded ${
                  workModels[model] ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => toggleWorkModel(model)}
              >
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </button>
            ))}
          </div>

          {/* Location */}
          <label className="block mb-2 font-medium">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option>Within US</option>
            <option>Outside US</option>
          </select>

          {/* Radius */}
          <label className="block mb-2 font-medium">Radius</label>
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option>10mi</option>
            <option>25mi</option>
            <option>50mi</option>
            <option>100mi</option>
          </select>
        </div>

        <button className="w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600">UPDATE</button>
      </div>
    </div>
  );
};

export default JobFiltersDrawer;
