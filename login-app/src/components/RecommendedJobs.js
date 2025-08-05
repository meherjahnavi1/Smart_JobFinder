// src/components/RecommendedJobs.js
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiFilter } from 'react-icons/fi';
import CompareOptimizeModal from './CompareOptimizeModal';
import EnhancedFilterDrawer from './EnhancedFilterDrawer';
import './RecommendedJobs.css';

const dummyJobs = [
  {
    job_id: '1',
    job_title: 'Frontend Developer',
    employer_name: 'TechCorp',
    job_description: 'We are looking for a React developer...',
    matchPercentage: 85,
    job_type: 'Full-time',
    experience_level: 'Entry',
    category: 'Recommended',
  },
  {
    job_id: '2',
    job_title: 'DevOps Engineer',
    employer_name: 'Cloud9',
    job_description: 'AWS, Terraform, CI/CD, and Docker experience required...',
    matchPercentage: 72,
    job_type: 'Remote',
    experience_level: 'Mid',
    category: 'Liked',
  },
  {
    job_id: '3',
    job_title: 'Full Stack Developer',
    employer_name: 'InnovateX',
    job_description: 'Work with MERN stack to build scalable applications...',
    matchPercentage: 64,
    job_type: 'Part-time',
    experience_level: 'Senior',
    category: 'Applied',
  },
  {
    job_id: '4',
    job_title: 'Data Engineer',
    employer_name: 'DataCorp',
    job_description: 'Build and maintain data pipelines...',
    matchPercentage: 78,
    job_type: 'Hybrid',
    experience_level: 'Mid',
    category: 'External',
  },
];

const RecommendedJobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState(dummyJobs);
  const [filters, setFilters] = useState({
    jobType: 'All',
    experienceLevel: 'All',
    activeTab: 'Recommended',
  });
  const [loadingId, setLoadingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSort = () => {
    const sorted = [...jobs].sort((a, b) => b.matchPercentage - a.matchPercentage);
    setJobs(sorted);
    toast.success('Sorted by match percentage');
  };

  const handleCustomizeResume = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesJobType =
      filters.jobType === 'All' || job.job_type.toLowerCase() === filters.jobType.toLowerCase();
    const matchesExperience =
      filters.experienceLevel === 'All' || job.experience_level.toLowerCase() === filters.experienceLevel.toLowerCase();
    const matchesTab = job.category === filters.activeTab;
    return matchesJobType && matchesExperience && matchesTab;
  });

  return (
    <div className="flex">
      {/* Main Jobs Area */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">🎯 Recommended Jobs</h1>
          <div className="space-x-3">
            <button
              onClick={handleSort}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Sort by Match
            </button>
            <button
              onClick={toggleFilters}
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300"
            >
              <FiFilter className="inline-block mr-1" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-4 mb-6">
          {['Recommended', 'Liked', 'Applied', 'External'].map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                filters.activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilters((prev) => ({ ...prev, activeTab: tab }))}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredJobs.map((job) => (
          <div
            key={job.job_id}
            className="border p-4 rounded-lg shadow mb-4 bg-white dark:bg-gray-900"
          >
            <h2 className="text-lg font-semibold">{job.job_title}</h2>
            <p className="text-sm text-gray-600 mb-1">{job.employer_name}</p>
            <p className="text-sm text-gray-700 mb-2">
              {job.job_description.slice(0, 150)}...
            </p>

            <p className="font-medium text-blue-600 mb-2">
              ✅ Match Score: {job.matchPercentage}%
            </p>

            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mr-2"
            >
              Apply Now
            </a>

            <button
              onClick={() => handleCustomizeResume(job)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              disabled={loadingId === job.job_id}
            >
              {loadingId === job.job_id ? 'Optimizing...' : '🎯 Customize Your Resume for More Score'}
            </button>
          </div>
        ))}
      </div>

      {/* 🔍 Enhanced Filter Drawer */}
      <EnhancedFilterDrawer
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* 🧠 Modal Popup for Compare & Optimized Resume */}
      {showModal && selectedJob && (
        <CompareOptimizeModal job={selectedJob} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RecommendedJobs;