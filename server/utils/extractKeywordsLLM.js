// server/utils/extractKeywordsLLM.js

const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractTechnicalKeywords(text) {
  const prompt = `Extract only the technical skills, programming languages, tools, and technologies mentioned in the following text. 
Return them as a plain comma-separated list with no duplicates:

---
${text}
---`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an AI specialized in extracting technical keywords from resumes and job descriptions.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300
    });

    const raw = response.choices[0].message.content;
    return raw.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
  } catch (error) {
    console.error('Error extracting keywords via LLM:', error);
    return [];
  }
}

module.exports = { extractTechnicalKeywords };
