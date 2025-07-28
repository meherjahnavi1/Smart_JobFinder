// src/components/InterviewBot.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import BotAnimation from '../assets/Robot-Bot 3D.json';
import Waveform from '../assets/waveform.json';
import './InterviewBot.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

// Simple TTS helper
async function speakText(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel(); // stop anything currently speaking
    window.speechSynthesis.speak(utterance);
  } catch {
    /* no-op */
  }
}

const InterviewBot = () => {
  const { state } = useLocation();

  // --- prefs coming from /interview-prep or other navigations ---
  const roleTitle =
    state?.roleTitle ||
    state?.role?.title ||
    'Software Engineer';

  const experienceLevel =
    state?.experienceLevel ||
    state?.preferences?.level ||
    'Mid-Level';

  const topics = state?.preferences?.topics || [];
  const strengths = state?.strengths || state?.preferences?.strengths || [];
  const gaps = state?.gaps || state?.preferences?.gaps || [];

  // --- ui state ---
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('Loading your first question…');
  const [questions, setQuestions] = useState([]);

  // voice
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const recognitionRef = useRef(null);

  // Ask the server for questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/generate-questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roleTitle,
            topics,
            strengths,
            gaps
          })
        });

        const data = await res.json();
        console.log('API Question Response:', data);

        const qArr = Array.isArray(data.questions) ? data.questions : [];
        setQuestions(qArr);

        if (qArr.length > 0) {
          setQuestion(qArr[0]);
          await speakText(qArr[0]);
        } else {
          setQuestion('No questions available for this role.');
        }
      } catch (e) {
        console.error('Failed to fetch questions:', e);
        setQuestion('Error loading questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleTitle]);

  const initRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;

    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    return rec;
  };

  const startListening = () => {
    const rec = initRecognition();
    if (!rec) {
      alert('SpeechRecognition is not supported in this browser.');
      return;
    }

    recognitionRef.current = rec;
    setIsListening(true);
    setAnswer('');
    setAnalysis(null);

    rec.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript || '';
      setAnswer(transcript);
    };

    rec.onerror = (e) => {
      console.error('SpeechRecognition error:', e);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* no-op */
    } finally {
      setIsListening(false);
    }
  };

  const analyzeAnswer = async () => {
    if (!answer.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/analyze-interview-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Failed to analyze answer:', err);
    }
  };

  const nextQuestion = async () => {
    const nextIdx = questionIndex + 1;
    if (nextIdx >= questions.length) {
      setQuestion("🌟 You've completed the interview!");
      setQuestionIndex(nextIdx);
      return;
    }
    setQuestionIndex(nextIdx);
    setQuestion(questions[nextIdx]);
    setAnswer('');
    setAnalysis(null);
    await speakText(questions[nextIdx]);
  };

  const canNext = questionIndex < questions.length;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side — preferences panel */}
      <aside className="w-64 bg-white text-black p-6 sticky top-0 h-screen overflow-y-auto shadow-md">
        <h2 className="text-xl font-semibold mb-4">⚙️ Your Custom Preferences</h2>
        <p className="mb-2"><strong>Experience Level:</strong> {experienceLevel}</p>
        <p className="mb-2"><strong>Topics:</strong> {topics.length ? topics.join(', ') : '—'}</p>
        <p className="mb-2"><strong>Strengths:</strong> {strengths.length ? strengths.join(', ') : '—'}</p>
        <p className="mb-2"><strong>Gaps:</strong> {gaps.length ? gaps.join(', ') : '—'}</p>
      </aside>

      {/* Main body */}
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🎙️ Interview Session — {roleTitle}
        </h1>

        {loading ? (
          <>
            <div className="text-green-400 font-semibold mb-4">Loading questions...</div>
            <Lottie animationData={BotAnimation} loop className="w-64 h-64" />
          </>
        ) : (
          <>
            <Lottie animationData={BotAnimation} loop className="w-64 h-64" />
            <div className="text-xl mt-6 text-center text-blue-300 font-medium max-w-3xl">
              {question}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-3">
              {!isListening ? (
                <button
                  onClick={startListening}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow"
                  disabled={!canNext}
                >
                  🎤 Record Answer
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                >
                  ⏹ Stop
                </button>
              )}

              <button
                onClick={analyzeAnswer}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow disabled:opacity-50"
                disabled={!answer.trim()}
              >
                🔍 Analyze My Answer
              </button>

              <button
                onClick={nextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow disabled:opacity-50"
                disabled={!canNext}
              >
                Next Question
              </button>
            </div>

            {isListening && (
              <div className="mt-4 w-40">
                <Lottie animationData={Waveform} loop />
              </div>
            )}

            {/* Transcript */}
            {answer && (
              <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2">🗣️ Your Answer (transcript)</h3>
                <p className="text-gray-200 whitespace-pre-wrap">{answer}</p>
              </div>
            )}

            {/* Analysis feedback */}
            {analysis && (
              <div className="mt-4 w-full max-w-3xl bg-gray-900 p-4 rounded">
                <h3 className="font-semibold mb-2">✅ Feedback</h3>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(analysis, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewBot;