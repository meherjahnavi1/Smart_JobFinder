const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Helper: Extract text from PDF or DOCX
async function extractTextFromFile(file) {
  const filePath = file.path;
  const mime = file.mimetype;

  if (mime === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mime === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

// Match score calculator
function calculateMatchPercentage(matched, unmatched) {
  const total = matched.length + unmatched.length;
  return total === 0 ? 0 : Math.round((matched.length / total) * 100);
}

// API: Resume optimization by inserting keywords in the Experience section
app.post('/api/generate-optimized-resume', async (req, res) => {
  try {
    const { resumeText, unmatchedKeywords } = req.body;

    if (!resumeText || !Array.isArray(unmatchedKeywords)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Find Professional Experience section
    const expHeader = /PROFESSIONAL EXPERIENCE/i;
    const expStart = resumeText.search(expHeader);

    if (expStart === -1) {
      return res.status(400).json({ error: 'No PROFESSIONAL EXPERIENCE section found in resume' });
    }

    const beforeExp = resumeText.substring(0, expStart);
    const afterExp = resumeText.substring(expStart);

    // Add unmatched keywords into experience as natural sentences
    const keywordSentences = unmatchedKeywords.map(
      kw => `• Worked with ${kw} to streamline operations and improve deployment outcomes.`
    ).join('\n');

    // Add to beginning of PROFESSIONAL EXPERIENCE section
    const modifiedExperience = afterExp.replace(/(PROFESSIONAL EXPERIENCE\s*\n)/i, `$1${keywordSentences}\n`);

    const optimizedResume = beforeExp + modifiedExperience;

    // Check which unmatched keywords are now included
    const newlyMatched = unmatchedKeywords.filter(
      kw => optimizedResume.toLowerCase().includes(kw.toLowerCase())
    );

    const newMatchPercentage = calculateMatchPercentage(newlyMatched, unmatchedKeywords.filter(k => !newlyMatched.includes(k)));

    res.json({ optimizedResume, matchPercentage: newMatchPercentage });
  } catch (err) {
    console.error('Optimization error:', err.message);
    res.status(500).json({ error: 'Failed to optimize resume' });
  }
});

// Resume comparison route
app.post('/api/compare-resumes', upload.array('resumes', 5), async (req, res) => {
  try {
    const files = req.files;
    const jobDescription = req.body.jobDescription;

    if (!files || !files.length || !jobDescription) {
      return res.status(400).json({ error: 'Missing resumes or job description.' });
    }

    const jobKeywords = jobDescription
      .toLowerCase()
      .match(/\b[a-zA-Z]{2,}\b/g) || [];

    const results = [];

    for (const file of files) {
      const resumeText = await extractTextFromFile(file);
      const resumeWords = resumeText.toLowerCase().match(/\b[a-zA-Z]{2,}\b/g) || [];

      const matched = jobKeywords.filter(word => resumeWords.includes(word));
      const unmatched = jobKeywords.filter(word => !resumeWords.includes(word));
      const extra = resumeWords.filter(word => !jobKeywords.includes(word));

      const matchPercentage = calculateMatchPercentage(matched, unmatched);

      results.push({
        filename: file.originalname,
        matchedKeywords: [...new Set(matched)],
        unmatchedKeywords: [...new Set(unmatched)],
        extraKeywords: [...new Set(extra)],
        matchPercentage,
        originalText: resumeText
      });

      // Delete uploaded file
      fs.unlinkSync(file.path);
    }

    res.json(results);
  } catch (err) {
    console.error('❌ Comparison failed:', err.message);
    res.status(500).json({ error: 'Internal server error while comparing resumes' });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
