// ✅ Frontend API utility to save extracted resume
export const saveExtractedResume = async (resumeData) => {
    try {
      const response = await fetch('http://localhost:3001/api/extracted-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });
      return await response.json();
    } catch (err) {
      console.error('❌ Failed to save extracted resume:', err);
    }
  };
  
  // ✅ Optional fetch to get latest resume
  export const getExtractedResume = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/extracted-resume/latest');
      return await response.json();
    } catch (err) {
      console.error('❌ Failed to load extracted resume:', err);
      return {};
    }
  };
  