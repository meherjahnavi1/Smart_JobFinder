// resumeParser.js
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'; // ✅ for React/browser usage

// ✅ Parse .docx using Mammoth.js
export const parseDocx = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

// ✅ Parse .pdf using pdfjs-dist
export const parsePdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    text += pageText + '\n';
  }

  return text;
};

// ✅ Extract basic data from resume text
export const extractResumeData = (text) => {
  return {
    name: text.match(/^[A-Z][a-z]+\s[A-Z][a-z]+/)?.[0] || '',
    email: text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || '',
    phone: text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || '',
    summary: text.slice(0, 500),
    skills: '',
    experience: [],
    education: [],
  };
};
