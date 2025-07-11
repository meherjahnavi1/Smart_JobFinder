function cleanText(text) {
    return text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
  }
  
  function compareText(resume, jd) {
    const resumeWords = new Set(cleanText(resume).split(/\s+/));
    const jdWords = cleanText(jd).split(/\s+/);
  
    let matched = [], unmatched = [];
  
    jdWords.forEach(word => {
      if (resumeWords.has(word)) {
        matched.push({ word, type: 'green' });
      } else {
        unmatched.push({ word, type: 'red' });
      }
    });
  
    const percentage = jdWords.length > 0 ? Math.round((matched.length / jdWords.length) * 100) : 0;
  
    return { matchedWords: matched, unmatchedWords: unmatched, matchPercentage: percentage };
  }
  
  module.exports = { compareText };
  