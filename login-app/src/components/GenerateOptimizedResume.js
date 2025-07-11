// components/GenerateOptimizedResume.js
import React, { useState } from 'react';
import axios from 'axios';

const GenerateOptimizedResume = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/generate-optimized-resume', {
        resumes: [
          {
            originalResumeText: "Experienced software engineer with expertise in React and Node.js.",
            jobDescription: "Looking for an engineer experienced with React, Node.js, Express, and MongoDB.",
            unmatchedKeywords: ["Express", "MongoDB"],
            userInfo: { name: "Srinivas" }
          }
        ]
      });

      setResults(response.data);
    } catch (error) {
      console.error("Error generating optimized resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Generate Optimized Resume</h2>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((res, idx) => (
            <div key={idx} className="p-4 border rounded bg-gray-100">
              <h4 className="font-semibold mb-2">{res.name}'s Optimized Resume:</h4>
              <pre className="whitespace-pre-wrap text-sm">{res.optimizedText}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateOptimizedResume;
