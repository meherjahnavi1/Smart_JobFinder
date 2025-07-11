const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const router = express.Router();

// POST /api/save-edited-resume
router.post('/', (req, res) => {
  const { editedResumeText, userInfo, mode } = req.body;

  if (!editedResumeText || !userInfo || !userInfo.name || !mode) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request: missing required fields.',
    });
  }

  if (mode === 'download') {
    try {
      const editedDir = path.join(__dirname, '..', 'public', 'edited');
      if (!fs.existsSync(editedDir)) {
        fs.mkdirSync(editedDir, { recursive: true });
      }

      const timestamp = Date.now();
      const safeName = userInfo.name.replace(/[^a-z0-9_\-]/gi, '_');
      const fileName = `${safeName || 'resume'}_${timestamp}.pdf`;
      const filePath = path.join(editedDir, fileName);

      const pdfDoc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(filePath);
      pdfDoc.pipe(writeStream);

      pdfDoc.fontSize(12).text(editedResumeText, {
        align: 'left',
        lineGap: 4,
        width: 500,
      });

      pdfDoc.end();

      writeStream.on('finish', () => {
        const downloadUrl = `/edited/${fileName}`;
        console.log('✅ PDF generated at:', downloadUrl);
        return res.json({ success: true, downloadUrl });
      });

      writeStream.on('error', (err) => {
        console.error('❌ Error writing PDF file:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to download PDF.',
        });
      });
    } catch (err) {
      console.error('❌ PDF generation error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to download PDF.',
      });
    }

  } else if (mode === 'save') {
    try {
      const dashboardFilePath = path.join(__dirname, '..', 'dashboardResumes.json');
      let savedResumes = [];

      // Create file if it doesn't exist
      if (!fs.existsSync(dashboardFilePath)) {
        fs.writeFileSync(dashboardFilePath, '[]', 'utf8');
      }

      const fileData = fs.readFileSync(dashboardFilePath, 'utf8');
      savedResumes = JSON.parse(fileData || '[]');

      const now = new Date().toISOString();
      const newEntry = {
        name: userInfo.name,
        email: userInfo.email || '',
        content: editedResumeText,
        timestamp: now,
        savedAt: now
      };
      

      savedResumes.push(newEntry);
      fs.writeFileSync(dashboardFilePath, JSON.stringify(savedResumes, null, 2));
      console.log('✅ Resume saved to dashboardResumes.json');
      return res.json({
        success: true,
        message: 'Resume saved successfully.',
      });
    } catch (err) {
      console.error('❌ Error saving resume:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to save in app.',
      });
    }

  } else {
    return res.status(400).json({
      success: false,
      message: 'Invalid mode.',
    });
  }
});

module.exports = router;
