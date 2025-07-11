// src/JobApplication.js
import React, { useState } from 'react';

function JobApplication() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    message: ''
  });
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success) {
        setResponseMsg('✅ ' + data.message);
        setForm({ name: '', email: '', position: '', message: '' });
      } else {
        setResponseMsg('❌ ' + data.message);
      }
    } catch {
      setResponseMsg('❌ Server error');
    }
  };

  return (
    <div className="container">
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="position"
          type="text"
          placeholder="Job Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Cover letter or message"
          value={form.message}
          onChange={handleChange}
          rows="4"
        />
        <button type="submit">Submit Application</button>
      </form>
      {responseMsg && <p className="message">{responseMsg}</p>}
    </div>
  );
}

export default JobApplication;
