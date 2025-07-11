import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiRefreshCw, FiRepeat } from 'react-icons/fi';
import Lottie from 'lottie-react';
import axios from 'axios';
import chatAnimation from '../assets/chat-bot.json';
import './Dashboard.css';
import ChatbotModal from '../components/ChatbotModal';
import DashboardSidebar from '../components/DashboardSidebar';

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const total = [...resumeFiles, ...acceptedFiles].slice(0, 5);
    setResumeFiles(total);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  const handleCompare = async () => {
    if (!jobDescription.trim() || resumeFiles.length === 0) {
      return alert('Please upload at least one resume and enter a job description.');
    }

    setLoading(true);
    const formData = new FormData();
    resumeFiles.forEach((file) => formData.append('resumes', file));
    formData.append('jobDescription', jobDescription);

    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/compare-resumes',
        formData
      );

      // Pass the entire array as `results`
      navigate('/compare-result', {
        state: { results: data },
      });
    } catch (err) {
      console.error('❌ Comparison error:', err);
      alert('Failed to compare resumes. Check your server.');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (idx) => {
    setResumeFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="dashboard-container ml-64">
        <h1 className="dashboard-title">Upload &amp; Compare</h1>
        <p className="dashboard-subtitle">
          Step 1: Upload your resume(s) and compare to your target job.
        </p>

        <div className="card-grid">
          {/* Upload */}
          <div className="dashboard-card" {...getRootProps()}>
            <input {...getInputProps()} />
            <FiUpload className="dashboard-icon" />
            <h3>Upload Resume</h3>
            <p>Drag & drop up to 5 resumes or click to select</p>
            <ul className="file-list">
              {resumeFiles.map((file, idx) => (
                <li key={idx} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Job desc */}
          <div className="dashboard-card">
            <FiRefreshCw className="dashboard-icon" />
            <h3>Paste Job Description</h3>
            <textarea
              className="dashboard-textarea"
              rows={4}
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Compare */}
          <div className="dashboard-card">
            <FiRepeat className="dashboard-icon" />
            <h3>Compare</h3>
            <button
              className="dashboard-button"
              onClick={handleCompare}
              disabled={loading || resumeFiles.length === 0 || !jobDescription.trim()}
            >
              {loading ? 'Comparing...' : 'Compare'}
            </button>
          </div>
        </div>

        {!showChat ? (
          <div className="chat-trigger" onClick={() => setShowChat(true)}>
            <Lottie animationData={chatAnimation} loop autoplay className="chat-lottie" />
            <div className="chat-message">Need help?</div>
          </div>
        ) : (
          <ChatbotModal onClose={() => setShowChat(false)} />
        )}
      </div>
    </div>
  );
}
