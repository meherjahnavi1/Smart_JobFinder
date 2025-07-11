// route/generate-optimized-resume.js
const express = require('express');
const router = express.Router();
const { generateOptimizedResumeText } = require('../utils/resumeAI');

router.post('/', async (req, res) => {
  console.log("Meher")
  const { resumes } = req.body;

  if (!Array.isArray(resumes) || resumes.length === 0) {
    return res.status(400).json({ error: 'Expected resumes to be a non-empty array' });
  }

console.log("Received resumes:", resumes);
  try {
    const results = await Promise.all(
      resumes.map(async ({ originalResumeText, jobDescription, unmatchedKeywords, userInfo }) => {
        const optimizedText = await generateOptimizedResumeText(
          originalResumeText,
          jobDescription,
          unmatchedKeywords,
          userInfo
        );

        return {
          name: userInfo.name,
          optimizedResumeText: optimizedText  // ✅ KEY FIXED HERE
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Resume optimization failed:', err);
    res.status(500).json({ error: 'Failed to generate optimized resume' });
  }
});

module.exports = router;
