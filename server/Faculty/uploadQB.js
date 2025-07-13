const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Fix: Define decodeBase64 here
function decodeBase64(base64Data) {
  const matches = base64Data.match(/^data:application\/pdf;base64,(.+)$/);
  const data = matches ? matches[1] : base64Data;
  return Buffer.from(data, 'base64');
}

router.post('/upload', async (req, res) => {
  const { subject, topic, fileName, fileData } = req.body;

  console.log('Received:', subject, topic, fileName, fileData.length);

  if (!subject || !topic || !fileName || !fileData) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const fileBuffer = decodeBase64(fileData);
    console.log("Inserting into DB:", subject, topic, fileName);
    console.log("File buffer size:", fileBuffer.length);

    await db.execute(
      'INSERT INTO question_bank (subject, topic, file_name, file_data) VALUES (?, ?, ?, ?)',
      [subject, topic, fileName, fileBuffer]
    );

    res.status(200).json({ message: 'Uploaded successfully' });
  } catch (err) {
    console.error('❌ DB insert failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
