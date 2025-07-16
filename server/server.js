// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to highlight inserted keywords in resume
function highlightInsertedKeywords(optimizedResume, insertedKeywords) {
  let highlighted = optimizedResume;

  insertedKeywords.forEach(keyword => {
    // Escape special characters in keywords
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escapedKeyword})\\b`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });

  return highlighted;
}

// OpenAI-based optimization endpoint
app.post('/api/generate-optimized-resume', async (req, res) => {
  const { resumeText, unmatchedKeywords } = req.body;

  if (!resumeText || !Array.isArray(unmatchedKeywords)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const prompt = `
Your task is to optimize the following resume by naturally including these missing keywords: ${unmatchedKeywords.join(', ')}.
Add them ONLY to the professional experience section using natural phrasing.
Use action verbs and avoid just listing them.

Resume:
${resumeText}

Optimized Resume:
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 1500,
    });

    const optimizedResume = completion.choices[0].message.content.trim();

    const highlightedResume = highlightInsertedKeywords(optimizedResume, unmatchedKeywords);

    const updatedMatchPercentage = 75; // Placeholder, improve later with real matching logic

    res.json({
      optimizedResume,
      highlightedResume,
      updatedMatchPercentage,
      insertedKeywords: unmatchedKeywords,
    });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to generate optimized resume' });
  }
});

app.listen(3001, () => {
  console.log('🚀 Resume Optimizer server running on http://localhost:3001');
});
