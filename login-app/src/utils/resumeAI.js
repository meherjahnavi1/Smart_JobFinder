// utils/resumeAI.js
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateOptimizedResumeText(original, jd, missingKeywords, userInfo) {
  const prompt = `
Your task is to improve a candidate's resume using missing keywords from a job description.

### Original Resume:
${original}

### Job Description:
${jd}

### Missing Keywords:
${missingKeywords.join(', ')}

### Instruction:
Update the resume naturally by incorporating the missing keywords into the relevant sections like Summary, Experience, and Skills. Maintain a professional tone and avoid keyword stuffing. The resume should be realistic and impactful.

Begin resume output below:
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateOptimizedResumeText };
