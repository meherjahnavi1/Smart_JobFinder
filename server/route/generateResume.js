// File: server/route/generateResume.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { OpenAI } = require('openai');

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/generate-optimized-resume
router.post('/', async (req, res) => {
  try {
    const { originalResumeText, jobDescription, unmatchedKeywords, userInfo } = req.body;

    const prompt = `Rewrite the following resume to better match the given job description by integrating the missing keywords. Keep it professional and structured.\n\nJOB DESCRIPTION:\n${jobDescription}\n\nMISSING KEYWORDS:\n${unmatchedKeywords.join(", ")}\n\nORIGINAL RESUME:\n${originalResumeText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional resume writer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const optimizedResume = completion.choices[0].message.content;

    // Create PDF
    const doc = new PDFDocument();
    const filename = `${userInfo?.name || 'optimized_resume'}.pdf`;
    const filePath = path.join(__dirname, '../uploads', filename);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    doc.font('Times-Roman').fontSize(12).text(optimizedResume, {
      align: 'left',
    });
    doc.end();

    writeStream.on('finish', () => {
      return res.json({
        downloadUrl: `/uploads/${filename}`,
        optimizedText: optimizedResume,
        message: 'Optimized resume generated successfully.',
      });
    });
  } catch (error) {
    console.error('Resume generation failed:', error);
    res.status(500).json({ error: 'Failed to generate optimized resume' });
  }
});

module.exports = router;
