// src/JobForm.js
import React, { useState } from 'react';

function JobForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resume: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setMessage('✅ ' + data.message);
        setFormData({ name: '', email: '', position: '', resume: '' });
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required /><br />
        <textarea name="resume" placeholder="Upload Resume" value={formData.resume} onChange={handleChange} required /><br />
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default JobForm;
