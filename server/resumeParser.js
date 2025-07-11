const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(filePath, mimetype) {
  if (mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else if (mimetype.includes('wordprocessingml')) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

module.exports = { extractText };
