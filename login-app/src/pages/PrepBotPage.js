// src/pages/PrepBotPage.js
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import InterviewBot from '../components/InterviewBot';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

const PrepBotPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    plan,
    strengths = [],
    gaps = [],
    extras = [],
    role = 'Software Engineer',
    interviewDate,
    experienceLevel,
    email,
    origin = 'generated',
  } = state || {};

  // ---- memoized schedule (normalize tasks -> {title, howTo}) ----
  const schedule = useMemo(
    () =>
      (plan?.schedule || []).map((d, idx) => ({
        ...d,
        _idx: idx,
        _dateObj: d.date ? dayjs(d.date) : null,
        tasks: Array.isArray(d.tasks)
          ? d.tasks.map((t) =>
              typeof t === 'string'
                ? { title: t, howTo: '' }
                : { title: t.title || '', howTo: t.howTo || '' }
            )
          : [],
      })),
    [plan]
  );

  // ---- find today / next upcoming ----
  const pickInitialIndex = useCallback(() => {
    const today = dayjs().startOf('day');
    const foundTodayIdx = schedule.findIndex(
      (s) => s._dateObj && s._dateObj.isSame(today, 'day')
    );
    if (foundTodayIdx !== -1) return foundTodayIdx;

    const upcomingIdx = schedule.findIndex(
      (s) => s._dateObj && s._dateObj.isAfter(today, 'day')
    );
    if (upcomingIdx !== -1) return upcomingIdx;

    return 0; // fallback
  }, [schedule]);

  const [currentIdx, setCurrentIdx] = useState(pickInitialIndex);
  const current = schedule[currentIdx] || null;

  // ---- activities panel (right sidebar) ----
  const [activePanel, setActivePanel] = useState('tasks'); // tasks | flashcards | mock | code | quiz | reflection

  // ---- track task completion per day ----
  const [completed, setCompleted] = useState({}); // { dayIdx: Set(taskIdx) }

  // ---- reflection log (per day) ----
  const [reflection, setReflection] = useState({}); // { dayIdx: string }

  // ---- task guidance ----
  const [guidance, setGuidance] = useState([]);
  const [guidanceLoading, setGuidanceLoading] = useState(false);
  const [guidanceError, setGuidanceError] = useState('');

  useEffect(() => {
    // initialize if missing
    if (current && completed[current._idx] === undefined) {
      setCompleted((prev) => ({ ...prev, [current._idx]: new Set() }));
    }
  }, [current, completed]);

  const totalTasksForDay = current?.tasks?.length || 0;
  const completedTasksForDay = current
    ? completed[current._idx]?.size || 0
    : 0;
  const dayProgressPercent =
    totalTasksForDay === 0
      ? 0
      : Math.round((completedTasksForDay / totalTasksForDay) * 100);

  const toggleTask = (taskIdx) => {
    if (!current) return;
    setCompleted((prev) => {
      const setForDay = new Set(prev[current._idx] || []);
      if (setForDay.has(taskIdx)) setForDay.delete(taskIdx);
      else setForDay.add(taskIdx);
      return { ...prev, [current._idx]: setForDay };
    });
  };

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrentIdx((i) => Math.min(schedule.length - 1, i + 1));

  const goBackToPlan = () => navigate(-1);

  // ---- Fetch HOW-TO guidance when on tasks panel or when day changes ----
  const fetchGuidance = useCallback(async () => {
    if (!current || !current.tasks?.length) {
      setGuidance([]);
      return;
    }

    try {
      setGuidanceLoading(true);
      setGuidanceError('');
      const res = await fetch(`${API_BASE}/api/task-guidance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks: current.tasks, // send objects (title/howTo) is fine
          topics: current.topics || [],
          level: experienceLevel || 'medium',
        }),
      });
      const data = await res.json();
      setGuidance(data.guidance || []);
    } catch (e) {
      console.error('Task guidance error', e);
      setGuidanceError('Failed to fetch guidance');
    } finally {
      setGuidanceLoading(false);
    }
  }, [current, experienceLevel]);

  useEffect(() => {
    if (activePanel === 'tasks') {
      fetchGuidance();
    }
  }, [activePanel, currentIdx, fetchGuidance]);

  // ---- Simple, client-side dynamic placeholders for Flashcards / Quiz / Code Drills ----
  const flashcards = useMemo(() => {
    const topics = current?.topics || [];
    return topics.map((t, idx) => ({
      id: idx,
      q: `Define / explain: ${t}`,
      a: `Your concise explanation of ${t} (add details / examples).`,
    }));
  }, [current]);

  const codeDrills = useMemo(() => {
    const topics = current?.topics || [];
    return topics.map((t, idx) => ({
      id: idx,
      prompt: `Write a short code exercise that demonstrates a core concept of "${t}".`,
    }));
  }, [current]);

  const quiz = useMemo(() => {
    const topics = current?.topics || [];
    return topics.slice(0, 5).map((t, idx) => ({
      id: idx,
      q: `Quick check on "${t}": name/describe 2 key points.`,
    }));
  }, [current]);

  if (!plan || !schedule.length) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-2xl font-bold mb-4">No plan found</h1>
        <p className="mb-4">
          We couldn’t find a plan in navigation state. Please generate a plan
          first.
        </p>
        <button
          onClick={() => navigate('/interview-prep')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Go to Interview Prep
        </button>
      </div>
    );
  }

  /* ---------------- RENDER HELPERS ---------------- */

  const renderTasksPanel = () => (
    <>
      {/* TOPICS */}
      {!!current?.topics?.length && (
        <div className="bg-gray-800 rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">📚 Topics</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
            {current.topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TASKS (checklist) */}
      <div className="bg-gray-800 rounded p-4 mb-8">
        <h3 className="font-semibold mb-3">✅ Tasks</h3>
        {(!current?.tasks || current.tasks.length === 0) && (
          <p className="text-gray-400 text-sm">No tasks listed for this day.</p>
        )}
        {!!current?.tasks?.length && (
          <ul className="space-y-3 text-sm">
            {current.tasks.map((task, i) => {
              const checked = completed[current._idx]?.has(i);
              return (
                <li key={i} className="flex flex-col gap-1">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-[3px] h-4 w-4"
                      checked={checked}
                      onChange={() => toggleTask(i)}
                    />
                    <span
                      className={checked ? 'line-through text-gray-500' : ''}
                    >
                      {task.title || task}
                    </span>
                  </label>

                  {task.howTo && !checked && (
                    <div className="ml-6 text-gray-400 text-xs whitespace-pre-line">
                      {task.howTo}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* HOW-TO guidance */}
      <div className="bg-gray-800 rounded p-4">
        <h3 className="font-semibold mb-3">🧭 How to do them</h3>
        {guidanceLoading && (
          <p className="text-sm text-gray-400">Loading guidance…</p>
        )}
        {guidanceError && (
          <p className="text-sm text-red-400">{guidanceError}</p>
        )}
        {!guidanceLoading && !guidanceError && guidance.length === 0 && (
          <p className="text-sm text-gray-400">
            No guidance available for these tasks.
          </p>
        )}
        {guidance.map((g, i) => (
          <div key={i} className="mb-5">
            <p className="font-semibold">{g.task}</p>
            {g.why && (
              <p className="text-xs text-gray-400 mb-2">Why: {g.why}</p>
            )}
            {g.steps?.length > 0 && (
              <ol className="list-decimal ml-4 text-sm space-y-1">
                {g.steps.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ol>
            )}
            {Array.isArray(g.resources) && g.resources.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Resources</p>
                <ul className="list-disc ml-5 text-sm">
                  {g.resources.map((r, idx) => (
                    <li key={idx}>
                      <a
                        href={r.url}
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {r.title || r.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {g.estTimeMins && (
              <p className="text-xs text-gray-400 mt-1">
                ⏱ Est. time: {g.estTimeMins} mins
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const renderFlashcardsPanel = () => (
    <div className="bg-gray-800 rounded p-4">
      <h3 className="font-semibold mb-3">🧠 Flashcards</h3>
      {flashcards.length === 0 && (
        <p className="text-sm text-gray-400">No flashcards for today.</p>
      )}
      {flashcards.map((c) => (
        <details key={c.id} className="mb-3 bg-gray-700 rounded p-3">
          <summary className="cursor-pointer select-none font-medium">
            {c.q}
          </summary>
          <p className="mt-2 text-sm">{c.a}</p>
        </details>
      ))}
    </div>
  );

  const renderMockPanel = () => (
    <div className="bg-gray-800 rounded p-4">
      <h3 className="font-semibold mb-3">🎤 Mock Interview — contextual</h3>
      <InterviewBot
        role={role}
        preferences={{
          strengths,
          gaps,
          topics: current?.topics ?? [],
          experienceLevel,
        }}
      />
    </div>
  );

  const renderCodePanel = () => (
    <div className="bg-gray-800 rounded p-4">
      <h3 className="font-semibold mb-3">💻 Code Drills</h3>
      {codeDrills.length === 0 && (
        <p className="text-sm text-gray-400">No drills for today.</p>
      )}
      <ul className="list-disc list-inside space-y-2 text-sm">
        {codeDrills.map((d) => (
          <li key={d.id}>{d.prompt}</li>
        ))}
      </ul>
    </div>
  );

  const renderQuizPanel = () => (
    <div className="bg-gray-800 rounded p-4">
      <h3 className="font-semibold mb-3">📝 Quick Quiz</h3>
      {quiz.length === 0 && (
        <p className="text-sm text-gray-400">No quiz items for today.</p>
      )}
      <ul className="list-disc list-inside space-y-2 text-sm">
        {quiz.map((q) => (
          <li key={q.id}>{q.q}</li>
        ))}
      </ul>
    </div>
  );

  const renderReflectionPanel = () => (
    <div className="bg-gray-800 rounded p-4">
      <h3 className="font-semibold mb-3">📓 Reflection Log</h3>
      <textarea
        className="w-full bg-gray-900 text-white rounded p-2 h-40 text-sm"
        placeholder="What went well today? What do you still find confusing?"
        value={reflection[currentIdx] || ''}
        onChange={(e) =>
          setReflection((prev) => ({ ...prev, [currentIdx]: e.target.value }))
        }
      />
    </div>
  );

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'flashcards':
        return renderFlashcardsPanel();
      case 'mock':
        return renderMockPanel();
      case 'code':
        return renderCodePanel();
      case 'quiz':
        return renderQuizPanel();
      case 'reflection':
        return renderReflectionPanel();
      case 'tasks':
      default:
        return renderTasksPanel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* MAIN CONTENT */}
      <div className="flex-1 px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Interview Prep – Interactive</h1>
            <p className="text-sm text-gray-400">
              Role: {role} · Level: {experienceLevel || '—'}{' '}
              {email ? `· ${email}` : ''}{' '}
              {origin === 'saved' ? '· (from saved plan)' : ''}
            </p>
            {interviewDate && (
              <p className="text-xs text-gray-500">
                Interview Date: {dayjs(interviewDate).format('YYYY-MM-DD')}
              </p>
            )}
          </div>

          <button
            onClick={goBackToPlan}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm"
          >
            ← Back to Plan
          </button>
        </div>

        {/* STRENGTHS / GAPS */}
        <div className="bg-gray-800 rounded p-4 mb-6">
          <h2 className="font-semibold mb-2">💪 Strengths</h2>
          <p className="text-sm text-gray-300">
            {strengths.length ? strengths.join(', ') : '—'}
          </p>
          <h2 className="font-semibold mt-4 mb-2">🧩 Gaps</h2>
          <p className="text-sm text-gray-300">
            {gaps.length ? gaps.join(', ') : '—'}
          </p>
        </div>

        {/* DAY NAV */}
        <div className="flex items-center justify-between mb-4">
          <button
            disabled={currentIdx === 0}
            onClick={goPrev}
            className={`px-3 py-1 rounded ${
              currentIdx === 0
                ? 'bg-gray-700 opacity-50'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            ← Prev
          </button>

          <div className="text-center">
            {current?._dateObj ? (
              <h2 className="text-lg font-semibold">
                {current._dateObj.format('dddd, MMM D, YYYY')} ·{' '}
                <span className="capitalize">{current.focus}</span>
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">
                Day {current?._idx + 1} ·{' '}
                <span className="capitalize">{current?.focus}</span>
              </h2>
            )}
            {current?._dateObj && current._dateObj.isSame(dayjs(), 'day') && (
              <span className="text-emerald-400 text-xs font-semibold">
                Today
              </span>
            )}
          </div>

          <button
            disabled={currentIdx === schedule.length - 1}
            onClick={goNext}
            className={`px-3 py-1 rounded ${
              currentIdx === schedule.length - 1
                ? 'bg-gray-700 opacity-50'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Next →
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress today</span>
            <span>{dayProgressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded overflow-hidden">
            <div
              style={{ width: `${dayProgressPercent}%` }}
              className="h-full bg-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* ACTIVE PANEL */}
        {renderActivePanel()}
      </div>

      {/* STICKY RIGHT SIDEBAR */}
      <aside className="hidden lg:block w-80 border-l border-gray-800 sticky top-0 h-screen overflow-y-auto p-6">
        <div className="mb-6">
          <h4 className="text-gray-400 uppercase text-xs tracking-wider mb-2">
            Day Selector
          </h4>
          <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
            {schedule.map((s) => {
              const isActive = s._idx === currentIdx;
              return (
                <button
                  key={s._idx}
                  onClick={() => setCurrentIdx(s._idx)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    isActive ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <span className="block font-semibold">
                    {s._dateObj ? s._dateObj.format('MMM D') : `Day ${s._idx + 1}`}
                  </span>
                  <span className="text-xs opacity-75 capitalize">
                    {s.focus}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-gray-400 uppercase text-xs tracking-wider mb-2">
            Activities
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'tasks' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('tasks')}
              >
                ✅ Daily Tasks
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'flashcards' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('flashcards')}
              >
                🧠 Flashcards
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'mock' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('mock')}
              >
                🎤 Mock Interview
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'code' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('code')}
              >
                💻 Code Drills
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'quiz' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('quiz')}
              >
                📝 Quick Quiz
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left bg-gray-800 p-2 rounded ${
                  activePanel === 'reflection' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActivePanel('reflection')}
              >
                📓 Reflection Log
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <button
            onClick={goBackToPlan}
            className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
          >
            ← Back to Plan
          </button>
        </div>
      </aside>
    </div>
  );
};

export default PrepBotPage;