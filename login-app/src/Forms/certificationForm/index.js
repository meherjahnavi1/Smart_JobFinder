import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CertificationForm = ({ onNext, onBack, editData }) => {
  const [certificationName, setCertificationName] = useState('');
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setCertificationName(editData.certificationName || '');
      setIssuingOrganization(editData.issuingOrganization || '');
      setIssueDate(editData.issueDate || '');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      certificationName,
      issuingOrganization,
      issueDate,
    };
    console.log('Collected Certifications:', formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#8247ff]">Certifications</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700"
        >
          Dashboard
        </button>
      </div>

      {/* Certification Fields */}
      <input
        type="text"
        placeholder="Certification Name"
        value={certificationName}
        onChange={(e) => setCertificationName(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
        required
      />
      <input
        type="text"
        placeholder="Issuing Organization"
        value={issuingOrganization}
        onChange={(e) => setIssuingOrganization(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-md"
      />
      <input
        type="date"
        placeholder="Issue Date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
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

export default CertificationForm;
