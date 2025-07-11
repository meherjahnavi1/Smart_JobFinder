// routes/extractedResume.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const savePath = path.join(__dirname, '../data/extracted-resumes.json');

// Ensure file exists
if (!fs.existsSync(savePath)) {
  fs.writeFileSync(savePath, JSON.stringify([]));
}

// POST: /api/extracted-resume
router.post('/', (req, res) => {
  const newResume = req.body;

  if (!newResume.name || !newResume.email) {
    return res.status(400).json({ success: false, message: 'Missing required fields (name, email)' });
  }

  const existing = JSON.parse(fs.readFileSync(savePath));
  existing.push({ ...newResume, timestamp: new Date().toISOString() });

  fs.writeFileSync(savePath, JSON.stringify(existing, null, 2));
  res.json({ success: true, message: 'Resume data saved' });
});

module.exports = router;
