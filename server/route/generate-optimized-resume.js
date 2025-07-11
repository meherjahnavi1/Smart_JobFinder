const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { resumes } = req.body;

  if (!Array.isArray(resumes) || resumes.length === 0) {
    return res.status(400).json({ error: 'Expected resumes to be a non-empty array' });
  }

  try {
    const results = await Promise.all(
      resumes.map(async (resume) => {
        const { originalResumeText, jobDescription, unmatchedKeywords, userInfo } = resume;

        const prompt = `
Your task is to improve a candidate's resume using missing keywords from a job description.

### Original Resume:
${originalResumeText}

### Job Description:
${jobDescription}

### Missing Keywords:
${unmatchedKeywords.join(', ')}

### Instruction:
Update the resume naturally by incorporating the missing keywords into the relevant sections like Summary, Experience, and Skills. Maintain a professional tone and avoid keyword stuffing. The resume should be realistic and impactful.

Begin resume output below:
        `;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        });

        const optimizedText = completion.choices[0].message.content.trim();

        return {
          name: userInfo.name,
          optimizedText,
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error generating optimized resume:', err);
    res.status(500).json({ error: 'Failed to generate optimized resume' });
  }
});

module.exports = router;
