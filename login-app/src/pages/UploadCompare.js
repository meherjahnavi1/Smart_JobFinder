// src/pages/UploadCompare.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadCompare = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid PDF file.');
      setSelectedFile(null);
    }
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleCompare = async () => {
    if (!selectedFile || !jobDescription) {
      alert('Please upload a resume and paste a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('jobDescription', jobDescription);

    console.log('📄 Uploaded Resume:', selectedFile.name);
    console.log('📋 Job Description:', jobDescription);

    try {
      setIsComparing(true);
      const response = await axios.post('http://localhost:3001/api/compare', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Comparison Result from API:', response.data);

      if (response.data.success && response.data.score !== undefined) {
        navigate('/compare-result', { state: {
          matchPercentage: response.data.score,
          matchedWords: response.data.matchedWords || [],
          unmatchedWords: response.data.unmatchedWords || []
        }});
      } else {
        alert('Comparison returned no useful data.');
      }

    } catch (error) {
      console.error('❌ Comparison failed:', error.response?.data || error.message);
      alert('Comparison failed. Please try again.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload & Compare</h1>
      <p className="text-gray-600 mb-8">Step 1: Upload your resume and compare it with your target job.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Upload Resume */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center border">
          <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="text-sm text-gray-700"
          />
          {selectedFile && <p className="text-xs mt-2 text-green-600">Selected: {selectedFile.name}</p>}
        </div>

        {/* Paste JD */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Paste Job Description</h2>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={handleDescriptionChange}
            placeholder="Paste job description here..."
            className="border rounded-md p-2 text-sm resize-none"
          />
        </div>

        {/* Compare */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Compare</h2>
          <button
            onClick={handleCompare}
            disabled={isComparing}
            className={`px-6 py-2 rounded-md font-semibold text-white ${
              isComparing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isComparing ? 'Comparing...' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCompare;
