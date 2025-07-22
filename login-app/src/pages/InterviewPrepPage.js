// src/pages/InterviewPrepPage.js
import React, { useState } from 'react';
import InterviewPrepCards from '../components/InterviewPrepCards';
import InterviewBot from '../components/InterviewBot';

const InterviewPrepPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleStartPrep = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🚀 Get Ready for Your Interview!
      </h1>
      {!selectedRole ? (
        <InterviewPrepCards onStartPrep={handleStartPrep} />
      ) : (
        <InterviewBot role={selectedRole} />
      )}
    </div>
  );
};

export default InterviewPrepPage;
