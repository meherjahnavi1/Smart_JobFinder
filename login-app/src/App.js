import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages and components
import Documents from './pages/Documents';
import LoaderPage from './pages/LoaderPage';
import InterviewBot from './components/InterviewBot'; // ✅ Corrected path
import ResumeBuilder from './pages/ResumeBuilder';
import SeniorTemplateLibrary from './pages/SeniorTemplateLibrary';
import ExecutiveTemplateLibrary from './pages/ExecutiveTemplateLibrary';
import InternTemplateLibrary from './pages/InternTemplateLibrary';
import ResumeUpload from './pages/ResumeUpload';
import JuniorTemplateLibrary from './pages/JuniorTemplateLibrary';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AuthPage from './pages/AuthRouter';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import VerifySuccess from './pages/VerifySuccess';
import ResetPassword from './pages/ResetPassword';
import CompareResultPage from './pages/CompareResultPage';
import OptimizedResumePage from './pages/OptimizedResumePage';
import InterviewPrepPage from './pages/InterviewPrepPage'; // ✅ New import

// Global styles
import './index.css';
import './App.css';

// Motion wrapper for page transitions
function SlideWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -50 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

// 404 fallback page
function NoMatch() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.2em', color: '#555' }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard" style={{ color: '#4a90e2', textDecoration: 'none', fontWeight: 'bold' }}>
        Go to Dashboard
      </Link>
    </div>
  );
}

// All animated route definitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SlideWrapper><LandingPage /></SlideWrapper>} />
        <Route path="/upload-resume" element={<SlideWrapper><ResumeUpload /></SlideWrapper>} />
        <Route path="/search" element={<SlideWrapper><SearchPage /></SlideWrapper>} />
        <Route path="/auth/confirm" element={<SlideWrapper><ConfirmEmail /></SlideWrapper>} />
        <Route path="/auth/*" element={<SlideWrapper><AuthPage /></SlideWrapper>} />
        <Route path="/reset-password" element={<SlideWrapper><ResetPassword /></SlideWrapper>} />

        {/* Resume Templates */}
        <Route path="/templates/junior" element={<SlideWrapper><JuniorTemplateLibrary /></SlideWrapper>} />
        <Route path="/templates/senior" element={<SlideWrapper><SeniorTemplateLibrary /></SlideWrapper>} />
        <Route path="/templates/executive" element={<SlideWrapper><ExecutiveTemplateLibrary /></SlideWrapper>} />
        <Route path="/templates/intern" element={<SlideWrapper><InternTemplateLibrary /></SlideWrapper>} />

        {/* Core Pages */}
        <Route path="/dashboard" element={<SlideWrapper><Dashboard /></SlideWrapper>} />
        <Route path="/compare-result" element={<SlideWrapper><CompareResultPage /></SlideWrapper>} />
        <Route path="/resume-builder" element={<SlideWrapper><ResumeBuilder /></SlideWrapper>} />
        <Route path="/loading" element={<SlideWrapper><LoaderPage /></SlideWrapper>} />
        <Route path="/interview-bot" element={<SlideWrapper><InterviewBot /></SlideWrapper>} />
        <Route path="/documents" element={<SlideWrapper><Documents /></SlideWrapper>} />
        <Route path="/verify-success" element={<SlideWrapper><VerifySuccess /></SlideWrapper>} />
        <Route path="/optimized-resume" element={<SlideWrapper><OptimizedResumePage /></SlideWrapper>} />
        <Route path="/forgot-password" element={<SlideWrapper><ForgotPassword /></SlideWrapper>} />

        {/* 🎯 New Interview Prep Page */}
        <Route path="/interview-prep" element={<SlideWrapper><InterviewPrepPage /></SlideWrapper>} />

        {/* Fallback */}
        <Route path="*" element={<SlideWrapper><NoMatch /></SlideWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// App Shell
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Main Content + Conditional Navbar
function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <div className="main-content-wrapper">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default App;
