// LandingPage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ladyImage from '../assets/lady-smiling.png';
import mobileMock from '../assets/mobile-score.png';
import tabletMock from '../assets/tablet-score.png';
import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import FadeInOnScroll from '../components/FadeInOnScroll';
import './LandingPage.css';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const scrollSmooth = {
  scrollBehavior: 'smooth',
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LandingPage = () => {
  return (
    <div className="landing-container" style={scrollSmooth}>
      <Helmet>
        <title>JobFinder – AI Resume Optimization & Matching</title>
        <meta name="description" content="Upload, optimize, and match your resume with AI-powered insights. Improve your job prospects with JobFinder today." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero-section flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="hero-text max-w-xl text-center md:text-left"
        >
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Upload and optimize your resume to land your dream job
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Find your best matches, get instant-score comparisons, and refine your resume using AI.
          </p>
          <motion.button
            className="bg-primary text-white px-6 py-3 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            UPLOAD RESUME
          </motion.button>

          <div className="stats mt-8 flex justify-center md:justify-start gap-8 text-center text-gray-700">
            <div>
              <strong className="text-xl block">
                <CountUp end={300} duration={2} prefix="$" suffix="M+" />
              </strong>
              <span className="text-sm">Refined Offers</span>
            </div>
            <div>
              <strong className="text-xl block">
                <CountUp end={10000} duration={2} suffix="+" />
              </strong>
              <span className="text-sm">Optimized</span>
            </div>
            <div>
              <strong className="text-xl block">
                <CountUp end={10000} duration={2} suffix="+" />
              </strong>
              <span className="text-sm">Success Stories</span>
            </div>
          </div>
        </motion.div>

        <motion.img
          src={ladyImage}
          alt="AI Resume Optimization Banner"
          className="w-full max-w-md rounded-xl shadow-lg"
          loading="lazy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        />
      </section>

      {/* ⭐ SCROLLING COMPANY STRIP */}
      <section className="accepted-strip">
        <div className="accepted-title">
          <span className="gray-star">⭐</span> Accepted by
        </div>
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {[
              "Amazon", "Google", "Microsoft", "Meta", "Netflix", "Salesforce",
              "LinkedIn", "Adobe", "Spotify", "Uber", "Tesla", "Airbnb",
              "Apple", "Stripe", "Oracle", "Intel", "Zoom", "PayPal",
              "Amazon", "Google", "Microsoft", "Meta"
            ].map((company, i) => (
              <span className="company-pill" key={i}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SCORE PREVIEW SECTION */}
      <section className="px-6 py-12 text-center bg-gray-50">
        <motion.h2 className="text-2xl font-semibold mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>Preview Match Score UI</motion.h2>
        <motion.div
          className="flex justify-center gap-8 flex-wrap items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={mobileMock}
            alt="Mobile Match Preview"
            className="w-40 md:w-52 rounded shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={tabletMock}
            alt="Tablet Score Preview"
            className="w-80 md:w-[30rem] rounded shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </section>

      {/* TEMPLATE SECTION with FadeInOnScroll */}
      <FadeInOnScroll>
        <section className="py-16 px-6 bg-slate-50 text-center" id="templates">
          <h2 className="text-2xl font-semibold mb-10">
            Choose a <span className="text-primary">Resume Template</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {[template1, template2, template3, template4].map((img, i) => {
              const titles = ['Junior', 'Senior', 'Executive', 'Intern'];
              const durations = [
                '1–3 years of experience',
                '3–7+ years of experience',
                '10+ years of experience',
                'Entry-level internship'
              ];

              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition hover:bg-gradient-to-br from-purple-50 to-blue-50"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                >
                  <img src={img} alt={`Template ${i + 1}`} className="rounded-lg shadow-sm w-full mb-4" loading="lazy" />
                  <p className="font-bold text-lg text-gray-800">{titles[i]}</p>
                  <p className="text-sm text-gray-500">{durations[i]}</p>
                </motion.div>
              );
            })}
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-full text-lg hover:bg-primary-dark transition">
            UPLOAD RESUME
          </button>
        </section>
      </FadeInOnScroll>
    </div>
  );
};

export default LandingPage;
