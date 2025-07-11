import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-left">
          <h1>Upload and optimize your resume to land your dream job</h1>
          <p>
            Find your best matches, get instant-score comparisons, and refine your resume using AI.
          </p>
          <button onClick={() => navigate('/compare')} className="primary-button">UPLOAD RESUME</button>
          <div className="stats">
            <div><strong>$300M+</strong><span>Refined Offers</span></div>
            <div><strong>10,000+</strong><span>Optimized</span></div>
            <div><strong>10,000+</strong><span>Success Stories</span></div>
          </div>
        </div>
        <div className="hero-right">
          <img src="/images/woman-laptop-new.png" alt="AI Resume" />
        </div>
      </header>

      {/* Score Comparison Section */}
      <section className="score-section">
        <h2>Refine your resume to <span className="highlight">stand out</span> to employers</h2>
        <p>
          Optimize for ATS and target job descriptions to improve your chances of getting hired.
        </p>
        <div className="devices">
          <img src="/images/resume-score-phone.png" alt="Resume Match" />
          <img src="/images/score-dashboard.png" alt="Score Dashboard" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Meet the people improving their <span className="highlight">resumes</span> with JobFinder</h2>
        <div className="faq-grid">
          <div>
            <p>01</p>
            <p>How does the res. optimization process work?</p>
          </div>
          <div>
            <p>02</p>
            <p>Is my personal information safe?</p>
          </div>
          <div>
            <p>03</p>
            <p>How quickly can I see results?</p>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <p><strong>Jonah D.</strong><br />Tailoring my resume for relevant keywords and focusing on results boosted my interviews.</p>
          </div>
          <div className="card">
            <p><strong>Emma S.</strong><br />Instant actionable suggestions helped me land a great role!</p>
          </div>
          <div className="card">
            <p><strong>William B.</strong><br />Strategic resume tweaks recommended by JobFinder made a big difference.</p>
          </div>
          <div className="card">
            <p><strong>Priva M.</strong><br />AI-based optimization gave my resume the edge it needed.</p>
          </div>
        </div>
      </section>

      <footer className="footer-cta">
        <button onClick={() => navigate('/compare')} className="primary-button">UPLOAD RESUME</button>
      </footer>
    </div>
  );
};

export default HomePage;
