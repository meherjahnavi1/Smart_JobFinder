import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import pointingAnimation from '../assets/Lottie_files/Pointing.json';

const Documents = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [documents, setDocuments] = useState([]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/saved-resumes');
      setDocuments(res.data.reverse());
    } catch (err) {
      console.error('Error fetching resumes:', err);
    }
  };

  const handleDeleteWithConfirm = async (timestamp) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this resume?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/delete-resume/${timestamp}`);
      setDocuments((prev) => prev.filter((doc) => doc.timestamp !== timestamp));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleNewResume = () => {
    navigate('/resume-builder');
  };

  const handleEdit = (doc) => {
    let structuredData = {};
    try {
      structuredData = JSON.parse(doc.content); // Expecting doc.content to be JSON string
    } catch (err) {
      console.warn('Resume content is not in JSON format.');
    }

    navigate('/resume-builder', { state: { editData: structuredData } });
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white overflow-x-hidden">
      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-[900px]">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[32px] font-extrabold text-black tracking-tight">Documents</h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition"
              >
                Dashboard
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-[#8247ff] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6f3fdb] transition"
                >
                  + Create New
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button
                      onClick={handleNewResume}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Resume
                    </button>
                    <button
                      disabled
                      className="block w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
                    >
                      Cover Letter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-gray-200 text-sm font-medium text-gray-600 mb-6">
            <div className="text-[#8247ff] border-b-2 border-[#8247ff] pb-1 cursor-pointer">All ({documents.length})</div>
            <div className="hover:text-[#8247ff] cursor-pointer">Resumes</div>
            <div className="hover:text-[#8247ff] cursor-pointer">Cover Letters</div>
          </div>

          {documents.length === 0 ? (
            <div className="text-center mt-16">
              <p className="text-gray-700 text-base font-medium mb-6">No documents found.</p>
              <div className="w-[250px] mx-auto">
                <Lottie animationData={pointingAnimation} loop={true} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.name || 'Untitled Resume'}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Created: {new Date(doc.timestamp).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(doc)}
                      className="text-sm text-[#8247ff] font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWithConfirm(doc.timestamp)}
                      className="text-sm text-red-500 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
