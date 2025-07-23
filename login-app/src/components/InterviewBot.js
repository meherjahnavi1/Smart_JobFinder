// src/pages/InterviewBot.js
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import './InterviewBot.css';
import BotAnimation from '../assets/Robot-Bot 3D.json';
import Waveform from '../assets/waveform.json';

const InterviewBot = ({ role, preferences }) => {
  const [isListening, setIsListening] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [fillerWords, setFillerWords] = useState([]);
  const [confidence, setConfidence] = useState(null);

  const handleStartSpeaking = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setKeywords(['cloud', 'CI/CD', 'AWS']);
      setFillerWords(['um', 'like']);
      setConfidence(82);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sticky Sidebar */}
      <aside className="w-64 bg-white text-black p-6 sticky top-0 h-screen overflow-y-auto shadow-md">
        <h2 className="text-xl font-semibold mb-4">⚙️ Your Custom Preferences</h2>
        <p className="mb-2"><strong>Interview Date:</strong> {preferences?.date || 'Not selected'}</p>
        <p className="mb-2"><strong>Experience Level:</strong> {preferences?.level || 'Not selected'}</p>
        <p><strong>Resume:</strong> {preferences?.resumeName || 'Not uploaded'}</p>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-8 relative">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          <span role="img" aria-label="mic">🎙️</span> Interview Session
          {role && <span className="text-xl ml-2 text-gray-400"> — {role.title}</span>}
        </h1>

        <div className="relative w-80 h-80">
          <Lottie animationData={BotAnimation} loop={true} />
          <div className="absolute top-1/2 right-[-150px] transform -translate-y-1/2 px-4 py-2 bg-zinc-900 rounded-lg shadow-lg text-sm">
            {isListening ? 'Listening...' : 'Tell me about yourself'}
          </div>
        </div>

        {/* Waveform Animation */}
        {isListening && (
          <div className="mt-10 w-full max-w-md flex justify-center items-center">
            <Lottie animationData={Waveform} loop={true} style={{ width: '300px' }} />
          </div>
        )}

        {/* Feedback Results */}
        {!isListening && confidence !== null && (
          <div className="mt-8 bg-zinc-900 rounded-xl p-6 shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold text-green-400 mb-2">✅ Response Analyzed!</h2>
            <p className="mb-1"><strong>Used keywords:</strong> {keywords.join(', ')}</p>
            <p className="mb-1"><strong>Filler words:</strong> {fillerWords.length} — {fillerWords.join(', ')}</p>
            <p><strong>Confidence:</strong>
              <span className="inline-block ml-2 bg-green-700 px-3 py-1 rounded-full text-white">{confidence}%</span>
            </p>
          </div>
        )}

        <button
          className={`mt-10 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
            isListening ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={handleStartSpeaking}
          disabled={isListening}
        >
          {isListening ? 'Listening...' : 'Start Speaking'}
        </button>
      </div>
    </div>
  );
};

export default InterviewBot;
