// src/pages/InterviewPrepPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewPrepCards from '../components/InterviewPrepCards';
import InterviewBot from '../components/InterviewBot';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

/** Safely fetch JSON (handles HTML/404 bodies gracefully) */
async function safeFetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    ...opts,
  });

  const text = await res.text(); // read once
  if (!res.ok) {
    try {
      const parsed = JSON.parse(text);
      throw new Error(parsed.error || `HTTP ${res.status}`);
    } catch {
      throw new Error(text || `HTTP ${res.status}`);
    }
  }

  return text ? JSON.parse(text) : {};
}

const InterviewPrepPage = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);

  // customization modal
  const [showDropdown, setShowDropdown] = useState(false);

  // form fields
  const [interviewDate, setInterviewDate] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [email, setEmail] = useState(() => localStorage.getItem('userEmail') || '');

  // ui state
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState('');

  // last saved plan from DB
  const [loadingLastPlan, setLoadingLastPlan] = useState(false);
  const [lastPlanDoc, setLastPlanDoc] = useState(null);
  const [lastPlanError, setLastPlanError] = useState('');

  // ---------------- helpers ----------------
  const fetchLastPlan = useCallback(async (userEmail) => {
    if (!userEmail) {
      setLastPlanDoc(null);
      return;
    }
    try {
      setLoadingLastPlan(true);
      setLastPlanError('');
      const data = await safeFetchJSON(
        `${API_BASE}/api/last-plan?email=${encodeURIComponent(userEmail)}`
      );
      console.log('[InterviewPrep] /api/last-plan ->', data);
      setLastPlanDoc(data.plan || null);
    } catch (e) {
      console.error('Failed to fetch last plan:', e);
      setLastPlanError('Failed to fetch last plan');
      setLastPlanDoc(null);
    } finally {
      setLoadingLastPlan(false);
    }
  }, []);

  useEffect(() => {
    fetchLastPlan(email);
  }, [email, fetchLastPlan]);

  const handleStartPrep = (role) => {
    const preferences = {
      role, // whatever the card passes (object with title or string)
      date: interviewDate,
      resumeName: resumeFile?.name,
      level: experienceLevel,
      email,
    };
    setSelectedRole(preferences);
  };

  /**
   * Generate & Save/Email plan
   * Uses your existing backend route: /api/generate-custom-plan
   */
  const handleSubmit = async () => {
    setError('');

    if (!interviewDate) {
      alert('Please choose your interview date.');
      return;
    }
    if (!experienceLevel) {
      alert('Please choose your experience level.');
      return;
    }
    if (!email) {
      alert('Please provide your email (the plan will be saved & emailed).');
      return;
    }

    try {
      setLoadingPlan(true);

      // We only need metadata for this route.
      // If you later want resume/jd extraction, keep your other route (plan-from-resume-jd).
      const body = {
        strengths: [], // you can wire these in from UI if you collect them
        gaps: [],
        skills: [], // or pass from resume parse
        experienceLevel,
        interviewDate,
        userEmail: email,
      };

      const res = await fetch(`${API_BASE}/api/generate-custom-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log('[InterviewPrep] /api/generate-custom-plan ->', data);

      if (!res.ok || !data?.plan) {
        console.error('Plan error:', data);
        setError(data.error || 'Failed to generate plan.');
        alert('❌ Failed to generate plan.');
      } else {
        setGeneratedPlan(data);

        // Reflect it as "last saved" locally so user can jump in.
        // (Your backend route that saves to DB can be separate)
        if (email) {
          setLastPlanDoc({
            userEmail: email,
            strengths: body.strengths,
            gaps: body.gaps,
            extras: [],
            plan: data.plan,
            createdAt: new Date().toISOString(),
          });
        }

        alert(
          email
            ? '📨 Custom plan generated, saved & (if configured) emailed!'
            : '✅ Custom plan generated!'
        );
        setShowDropdown(false);
      }
    } catch (err) {
      console.error('❌ Error generating plan:', err);
      setError('Something went wrong while generating your plan.');
      alert('Something went wrong while generating your plan.');
    } finally {
      setLoadingPlan(false);
    }
  };

  /** jump into the interactive prep-bot page */
  const goToPrepBot = (doc, origin = 'generated') => {
    if (!doc) return;

    // ✅ Fallback schedule so PrepBotPage never shows "No plan found"
    const hasValidSchedule =
      doc.plan &&
      Array.isArray(doc.plan.schedule) &&
      doc.plan.schedule.length > 0;

    const safePlan = hasValidSchedule
      ? doc.plan
      : {
          schedule: [
            {
              date: new Date().toISOString().slice(0, 10),
              focus: 'mixed',
              topics: ['General CS fundamentals', 'Behavioral prep'],
              tasks: [
                { title: 'Skim DS & Algo notes', howTo: '' },
                { title: 'Write STAR answers for 2 projects', howTo: '' },
              ],
            },
          ],
          meta: {
            totalDays: 1,
            focusDistribution: { gap: 0, strength: 0, mixed: 1 },
          },
        };

    const payload = {
      plan: safePlan,
      strengths: doc.strengths || [],
      gaps: doc.gaps || [],
      extras: doc.extras || [],
      interviewDate,
      experienceLevel,
      email,
      role: selectedRole?.role?.title || 'Software Engineer',
      origin,
    };

    console.log('[InterviewPrep] navigating to /prep-bot with state:', payload);

    navigate('/prep-bot', {
      state: payload,
    });
  };

  const PlanPreview = ({ doc, title = '📬 Plan Preview', onStart }) => {
    if (!doc) return null;

    const { strengths = [], gaps = [], plan = {} } = doc;
    const schedule = plan?.schedule || [];
    const hasSchedule = Array.isArray(schedule) && schedule.length > 0;

    return (
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="mb-2">
          <strong>Strengths:</strong> {strengths.length ? strengths.join(', ') : '—'}
        </p>
        <p className="mb-4">
          <strong>Gaps:</strong> {gaps.length ? gaps.join(', ') : '—'}
        </p>

        {doc.createdAt && (
          <p className="text-xs text-gray-400 mb-4">
            Saved on: {new Date(doc.createdAt).toLocaleString()}
          </p>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto pr-3 text-sm">
          {!hasSchedule && (
            <div className="bg-gray-700 p-3 rounded text-gray-300">
              No schedule found for this plan. Strengths and gaps are still saved.
            </div>
          )}

          {hasSchedule &&
            schedule.map((d, i) => (
              <div key={i} className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">
                  {d.date} — <span className="capitalize">{d.focus}</span>
                </p>
                {d.topics?.length > 0 && (
                  <p><strong>Topics:</strong> {d.topics.join(', ')}</p>
                )}
                {d.tasks?.length > 0 && (
                  <p>
                    <strong>Tasks:</strong>{' '}
                    {d.tasks
                      .map((t) => (typeof t === 'string' ? t : t.title || ''))
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
            ))}
        </div>

        {typeof onStart === 'function' && (
          <button
            onClick={onStart}
            className="mt-6 px-5 py-2 rounded font-semibold shadow text-white bg-emerald-500 hover:bg-emerald-600"
          >
            🚀 Let’s Get Started
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 pt-10 pb-20 text-white relative">
      <h1 className="text-3xl font-bold mb-2 text-center">
        🚀 Get Ready for Your Interview!
      </h1>

      {/* ----- "Customize Prep" button + modal ----- */}
      <div className="flex justify-center mb-6 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-700 px-4 py-2 rounded text-white font-semibold shadow"
        >
          🎯 Customize Your Interview Prep ▾
        </button>

        {showDropdown && (
          <div className="absolute top-12 bg-white text-black p-5 rounded shadow-xl w-[420px] max-w-[90vw] z-50">
            <button
              onClick={() => setShowDropdown(false)}
              className="absolute top-2 right-3 text-lg text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <label className="block mt-2 text-sm font-semibold">Interview Date:</label>
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />

            <label className="block mt-4 text-sm font-semibold">Upload Resume (optional PDF/Text):</label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full mt-1 p-1"
            />

            <label className="block mt-4 text-sm font-semibold">Upload Job Description (optional PDF/Text):</label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setJdFile(e.target.files[0])}
              className="w-full mt-1 p-1"
            />

            <label className="block mt-4 text-sm font-semibold">Or paste JD (optional):</label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              rows={4}
              placeholder="Paste JD text if you didn't upload a file…"
            />

            <label className="block mt-4 text-sm font-semibold">Experience Level:</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select (required)</option>
              <option value="beginner">Beginner</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </select>

            <label className="block mt-4 text-sm font-semibold">Your Email (required – to save & receive the plan):</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                localStorage.setItem('userEmail', e.target.value);
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="you@example.com"
            />

            <button
              onClick={handleSubmit}
              disabled={loadingPlan}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded font-semibold shadow"
            >
              {loadingPlan ? 'Generating…' : '✨ Generate & Save/Email My Plan'}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          </div>
        )}
      </div>

      {/* ----- Last Saved Plan (DB) ----- */}
      {email && (
        <div className="max-w-4xl mx-auto mb-4">
          <h2 className="text-lg font-semibold mb-2">📚 Your Last Saved Plan</h2>
          {loadingLastPlan && <p className="text-gray-400">Loading your last saved plan…</p>}
          {lastPlanError && <p className="text-red-400">{lastPlanError}</p>}
          {!loadingLastPlan && !lastPlanDoc && !lastPlanError && (
          <p className="text-gray-400">No saved plan found.</p>
          )}
        </div>
      )}

      {lastPlanDoc && (
        <PlanPreview
          doc={lastPlanDoc}
          title="📚 Your Last Saved Plan"
          onStart={() =>
            goToPrepBot(
              {
                strengths: lastPlanDoc.strengths,
                gaps: lastPlanDoc.gaps,
                extras: lastPlanDoc.extras,
                plan: lastPlanDoc.plan,
              },
              'saved'
            )
          }
        />
      )}

      {/* ----- Freshly Generated Plan (this session) ----- */}
      {generatedPlan && (
        <PlanPreview
          doc={{
            strengths: generatedPlan.strengths || [],
            gaps: generatedPlan.gaps || [],
            extras: generatedPlan.extras || [],
            plan: generatedPlan.plan,
            createdAt: new Date().toISOString(),
          }}
          title="📬 Plan Preview (Just Generated)"
          onStart={() =>
            goToPrepBot(
              {
                strengths: generatedPlan.strengths || [],
                gaps: generatedPlan.gaps || [],
                extras: generatedPlan.extras || [],
                plan: generatedPlan.plan,
              },
              'generated'
            )
          }
        />
      )}

      {/* ---------- Hard fallback button ---------- */}
      {(generatedPlan || lastPlanDoc) && (
        <div className="max-w-4xl mx-auto mb-10">
          <button
            onClick={() =>
              goToPrepBot(
                generatedPlan
                  ? {
                      strengths: generatedPlan.strengths || [],
                      gaps: generatedPlan.gaps || [],
                      extras: generatedPlan.extras || [],
                      plan: generatedPlan.plan,
                    }
                  : {
                      strengths: lastPlanDoc.strengths,
                      gaps: lastPlanDoc.gaps,
                      extras: lastPlanDoc.extras,
                      plan: lastPlanDoc.plan,
                    },
                generatedPlan ? 'generated' : 'saved'
              )
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded font-semibold shadow"
          >
            👉 Go to Prep Bot (fallback)
          </button>
        </div>
      )}

      {/* Role cards / Interview bot (old flow still works) */}
      {!selectedRole ? (
        <InterviewPrepCards onStartPrep={handleStartPrep} />
      ) : (
        <InterviewBot role={selectedRole.role} preferences={selectedRole} />
      )}
    </div>
  );
};

export default InterviewPrepPage;