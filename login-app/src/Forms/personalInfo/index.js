import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = ({ onNext, onBack, editData }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setFullName(editData.fullName || '');
      setPhone(editData.phone || '');
      setAddress(editData.address || '');
      setSummary(editData.summary || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      phone,
      address,
      summary,
    };
    console.log('Collected Personal Info:', formData);
    // You can store formData in context/localStorage here if needed
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Personal Information</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <textarea
          rows={4}
          placeholder="Write a short summary about yourself"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
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

export default PersonalInfo;
