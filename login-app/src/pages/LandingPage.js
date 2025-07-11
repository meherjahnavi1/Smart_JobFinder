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

      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Meet the people improving their <span className="text-primary">resumes</span> with JobFinder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {["Tailoring my resume for relevant keywords and automatic suggestions focused exactly on what employers were.",
            "Instant feedback and actionable suggestions made my application process so much smoother.",
            "Smart recommendations for multiple positions helped me get more responses and interviews.",
            "Resume tuning based on the job description truly improved my match rate and responses."].map((quote, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow border border-gray-100 text-gray-800 text-sm md:text-base"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              {quote}
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
          <p><strong>01</strong> How does the resume optimization process work?</p>
          <p><strong>02</strong> Is my personal information safe?</p>
          <p><strong>03</strong> How quickly can I get results?</p>
        </div>
      </section>

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

      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          We're <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">improving resumes</span> faster than ever
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div className="bg-white p-6 rounded-xl shadow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Job Description Match</h3>
            <div className="bg-indigo-100 p-4 rounded text-center">
              <p className="text-2xl font-bold text-indigo-700">82%</p>
              <p className="text-sm text-gray-600 mt-1">Compares against job descriptions</p>
            </div>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-xl shadow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Tailored Suggestions</h3>
            <ul className="list-disc text-left list-inside text-gray-600 text-sm space-y-1">
              <li>Pairing Suggestions</li>
              <li>Module Drills</li>
              <li>Keywords to Add</li>
            </ul>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-xl shadow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recruiter Insights</h3>
            <p className="text-sm text-gray-600">
              We analyze your resume data and provide actionable tips to increase relevance and visibility with top recruiters.
            </p>
          </motion.div>
        </div>

      </section>
    </div>
    
  );
};

export default LandingPage;