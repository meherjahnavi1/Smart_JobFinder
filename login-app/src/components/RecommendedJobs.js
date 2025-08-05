// src/components/RecommendedJobs.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    query: "Data Analyst",
    job_type: "Full-time",
    remote: true,
    onsite: true,
    hybrid: true,
    location: "Within US",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("https://jsearch.p.rapidapi.com/search", {
          params: { query: filters.query, num_pages: 1 },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        });
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setIsParsing(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await axios.post("http://localhost:3001/api/parse-resume-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const skills = extractKeywords(data.resumeText);
      setParsedSkills(skills);
      toast.success("✅ Resume parsed and keywords extracted!");
    } catch (err) {
      console.error("Resume parsing failed:", err);
      toast.error("❌ Failed to parse resume.");
    } finally {
      setIsParsing(false);
    }
  };

  const extractKeywords = (text) => {
    const stopwords = ['the', 'is', 'in', 'with', 'to', 'for', 'a', 'of', 'on', 'and'];
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    return [...new Set(words.filter(w => w.length > 3 && !stopwords.includes(w)))];
  };

  const getMatchPercentage = (job) => {
    const jobText = `${job.job_title} ${job.job_description}`.toLowerCase();
    const matchedSkills = parsedSkills.filter((skill) => jobText.includes(skill));
    return Math.round((matchedSkills.length / parsedSkills.length) * 100) || 0;
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    const aMatch = parsedSkills.length ? getMatchPercentage(a) : 0;
    const bMatch = parsedSkills.length ? getMatchPercentage(b) : 0;
    return bMatch - aMatch;
  });

  const filteredJobs = parsedSkills.length
    ? sortedJobs.filter((job) => getMatchPercentage(job) >= 50)
    : sortedJobs;

  return (
    <div className="relative">
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎯 Recommended Jobs</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiFilter /> Edit Filters
        </button>
      </div>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button onClick={() => setShowFilters(false)}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Upload Resume */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Resume
          </h3>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
          />
          <p className="text-xs text-gray-500 mt-1">
            Used to calculate job match %
          </p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {isParsing && (
          <div className="text-sm text-gray-500 mb-4">⏳ Parsing resume...</div>
        )}

        {filteredJobs.length ? filteredJobs.map((job) => (
          <div
            key={job.job_id}
            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex justify-between items-start hover:shadow-md transition cursor-pointer"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {job.job_title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {job.employer_name} / {job.job_city || "Unknown"}
              </p>

              <div className="mb-3">
                <p className="text-sm font-medium text-green-700 mb-1">
                  Match: {getMatchPercentage(job)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${getMatchPercentage(job)}%` }}
                  />
                </div>
              </div>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                onClick={() => window.open(job.job_apply_link, "_blank")}
              >
                APPLY NOW
              </button>
            </div>
          </div>
        )) : (
          <p className="text-gray-500 text-sm italic mt-4">
            No jobs match your resume above 50%. Try uploading a different resume or adjusting filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;