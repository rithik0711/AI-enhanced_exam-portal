const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Route: Fetch all uploaded question banks  
router.get('/question-bank', async (req, res) => {
  const [rows] = await db.execute('SELECT id, subject, topic, file_name, file_data FROM question_bank');

  const result = rows.map(row => ({
    id: row.id,
    subject: row.subject,
    topic: row.topic,
    fileName: row.file_name,
    fileBase64: row.file_data ? row.file_data.toString('base64') : '', // ✔️ handles null
  }));

  res.status(200).json(result);
});


module.exports = router;
