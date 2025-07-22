// src/pages/InterviewBot.js
import React, { useState } from 'react';
import './InterviewBot.css';

const InterviewBot = () => {
  const [isListening, setIsListening] = useState(false);
  const [keywords, setKeywords] = useState(['software engineer', 'backend']);
  const [fillerWords, setFillerWords] = useState(['um', 'uh']);
  const [confidence, setConfidence] = useState(75);

  const handleStartSpeaking = () => {
    setIsListening(true);
    // 🔁 Here you would plug in Web Speech API or OpenAI Whisper integration
    setTimeout(() => {
      setIsListening(false);
      // Simulate result
      setKeywords(['software engineer', 'backend']);
      setFillerWords(['um', 'uh']);
      setConfidence(75);
    }, 3000);
  };

  return (
    <div className="interview-bot-container">
      <h1 className="title">Tell me about yourself</h1>

      <div className="bot-section">
        <img src="/images/bot.png" alt="Interview Bot" className="bot-image" />
        <div className="speech-bubble">Tell me about yourself</div>
      </div>

      {isListening && <div className="waveform">🔊 Listening...</div>}

      {!isListening && (
        <div className="feedback-box">
          <h2>Great job!</h2>
          <p><strong>Used keywords:</strong> {keywords.join(', ')}</p>
          <p><strong>Filler words:</strong> {fillerWords.length} {fillerWords.join(', ')}</p>
          <p><strong>Confidence:</strong>
            <span className="confidence-circle">{confidence}%</span>
          </p>
        </div>
      )}

      <button className="start-button" onClick={handleStartSpeaking}>Start Speaking</button>
    </div>
  );
};

export default InterviewBot;
