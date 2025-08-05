import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ReactPlayer from "react-player";
import DashboardSidebar from "../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import RecommendedJobs from "../components/RecommendedJobs"; // ✅ NEW

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const videoData = [
    {
      title: "Resume Tips",
      duration: "2:59",
      url: "https://www.youtube.com/watch?v=Tt08KmFfIYQ",
    },
    {
      title: "Interview Skills",
      duration: "3:13",
      url: "https://www.youtube.com/watch?v=HG68Ymazo18&t=42s",
    },
    {
      title: "ATS Secrets",
      duration: "3:32",
      url: "https://www.youtube.com/watch?v=rWQpbuBgy9s",
    },
  ];

  const handleCompare = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload a resume and paste a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch("http://localhost:3001/api/compare-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.results) {
        navigate("/compare-result", {
          state: {
            results: data.results,
            jobDescription,
          },
        });
      } else {
        alert("No results received from server.");
      }
    } catch (err) {
      console.error("❌ Comparison failed:", err);
      alert("Comparison failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 ml-20 overflow-y-auto bg-gray-900 text-white px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Resume Match Assistant</h1>
            <p className="text-gray-400 text-sm mt-1">
              Quickly align your resume with your dream job
            </p>
          </div>
        </div>

        {/* Resume Match Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {/* Step 1 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-sm text-purple-400 font-semibold mb-1">1</div>
            <h2 className="text-lg font-semibold mb-2">Upload Resume</h2>
            <p className="text-gray-300 text-sm mb-3">Upload your PDF resume</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="text-white"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-sm text-purple-400 font-semibold mb-1">2</div>
            <h2 className="text-lg font-semibold mb-2">Paste Job Description</h2>
            <textarea
              rows="6"
              placeholder="Paste job description here..."
              className="w-full p-3 bg-gray-900 text-sm text-white border border-gray-700 rounded resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Compare</h2>
            <button
              onClick={handleCompare}
              className="bg-primary text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Compare
            </button>
          </div>
        </div>

        {/* ✅ Recommended Jobs Section - always shown */}
        <div className="mt-12 bg-white p-6 rounded-xl text-black">
          <RecommendedJobs />
        </div>

        {/* Learn & Improve */}
        <div className="mt-12">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <span role="img" aria-label="video" className="mr-2">
              🎥
            </span>
            Learn & Improve
          </h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-xl"
          >
            {videoData.map((video, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="h-48">
                    <ReactPlayer
                      url={video.url}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-gray-400">{video.duration}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;