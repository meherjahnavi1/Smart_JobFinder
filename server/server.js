const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { OpenAI } = require('openai');
const nlp = require('compromise'); // ✅ NLP Library added
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Technical keywords to look for
const technicalKeywords = [
  'JavaScript', 'Python', 'AWS', 'React', 'Node.js', 'Docker',
  'Kubernetes', 'CI/CD', 'MongoDB', 'MySQL', 'PostgreSQL',
  'Terraform', 'Linux', 'Git', 'Jenkins', 'Azure', 'GCP',
  'HTML', 'CSS', 'TypeScript', 'Express', 'Spring Boot'
];

// Helpers for parsing files
function extractTextFromPdf(buffer) {
  return pdfParse(buffer).then(res => res.text);
}

function extractTextFromDocx(buffer) {
  return mammoth.extractRawText({ buffer }).then(res => res.value);
}

// ✅ NLP-based tokenizer using compromise
function tokenize(text) {
  const doc = nlp(text);
  return doc
    .terms()
    .out('array')
    .map(token => token.toLowerCase())
    .filter(w => w.length > 2);
}

// Keep only words in our technicalKeywords list
function filterTechnicalWords(words) {
  const kwLower = technicalKeywords.map(k => k.toLowerCase());
  return words.filter(w => kwLower.includes(w));
}

// Create optimized resume via OpenAI
async function generateOptimizedResume(originalText, missingKeywords) {
  const prompt = `You are a resume optimization assistant. 
Revise the resume below to naturally include these missing keywords: ${missingKeywords.join(', ')}.
Keep it professional and well-formatted.

---\n${originalText}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You improve resumes by adding missing ATS keywords.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1200
  });

  return response.choices[0].message.content;
}

// Compare resumes vs JD
app.post('/api/compare-resumes', upload.array('resumes'), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || '';
    const jdTokens = filterTechnicalWords(tokenize(jobDescription));
    const jdSet = new Set(jdTokens);

    const results = await Promise.all(
      req.files.map(async file => {
        // Extract resume text
        let resumeText = '';
        if (file.mimetype === 'application/pdf') {
          resumeText = await extractTextFromPdf(file.buffer);
        } else {
          resumeText = await extractTextFromDocx(file.buffer);
        }

        // Tokenize & filter
        const resTokens = filterTechnicalWords(tokenize(resumeText));
        const resSet = new Set(resTokens);

        // Build matched/unmatched lists
        const matched = Array.from(jdSet).filter(w => resSet.has(w));
        const unmatched = Array.from(jdSet).filter(w => !resSet.has(w));
        const matchPercentage = jdSet.size
          ? Math.round((matched.length / jdSet.size) * 100)
          : 0;

        return {
          filename: file.originalname,
          matchedKeywords: matched,
          unmatchedKeywords: unmatched,
          matchPercentage,
          originalText: resumeText
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error('❌ Error in /compare-resumes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Generate optimized resume
app.post('/api/generate-optimized-resume', async (req, res) => {
  const { resumeText, unmatchedKeywords } = req.body;

  // Validate inputs
  if (typeof resumeText !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid resumeText' });
  }
  if (!Array.isArray(unmatchedKeywords)) {
    return res.status(400).json({ error: 'unmatchedKeywords must be an array' });
  }

  // If nothing is missing, just return the original resume
  if (unmatchedKeywords.length === 0) {
    return res.json({ optimizedResume: resumeText });
  }

  try {
    const optimized = await generateOptimizedResume(resumeText, unmatchedKeywords);
    res.json({ optimizedResume: optimized });
  } catch (err) {
    console.error('❌ Error in /generate-optimized-resume:', err);
    res.status(500).json({ error: 'Failed to generate optimized resume' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});