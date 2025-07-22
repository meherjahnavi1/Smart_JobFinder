// src/components/InterviewPrepCards.js
import React from 'react';

const chatbots = [
  {
    role: 'Software Engineer',
    messages: '120.5K messages',
    image: '/images/software.png',
  },
  {
    role: 'Data Scientist',
    messages: '65.3K messages',
    image: '/images/data_scientist.png',
  },
  {
    role: 'Cybersecurity',
    messages: '37.1K messages',
    image: '/images/cybersecurity.png',
  },
  {
    role: 'Product Manager',
    messages: '25.9K messages',
    image: '/images/product_manager.png',
  },
  {
    role: 'DevOps Engineer',
    messages: '20.5K messages',
    image: '/images/Dev_ops.png',
  },
  {
    role: 'Full Stack Developer',
    messages: '12.5K messages',
    image: '/images/fullstack.png',
  },
  {
    role: 'Data Engineer',
    messages: '32.5K messages',
    image: '/images/software.png',
  },
  {
    role: 'Cloud Architect',
    messages: '10.5K messages',
    image: '/images/software.png',
  },
  {
    role: 'Salesforce Developer',
    messages: '32.3K messages',
    image: '/images/software.png',
  },
  {
    role: 'Systems Analyst',
    messages: '42.2K messages',
    image: '/images/software.png',
  },
  {
    role: 'Game Designer',
    messages: '20.2K messages',
    image: '/images/software.png',
  },
  {
    role: 'Graphic Designer',
    messages: '12.5K messages',
    image: '/images/software.png',
  },
];

const InterviewPrepCards = () => {
  return (
    <div className="bg-black min-h-screen py-10 px-6">
      <h2 className="text-white text-3xl font-bold text-center mb-10">🎯 Interview Prep for Top Tech Roles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {chatbots.map((bot, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-xl relative h-72"
            style={{
              backgroundImage: `url(${bot.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
              <h2 className="text-xl font-bold mb-1">{bot.role}</h2>
              <p className="text-sm mb-4">{bot.messages}</p>
              <button className="bg-white text-black font-semibold py-2 px-4 rounded-xl w-fit self-start">
                Start your prep
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrepCards;
