const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/student/schedule', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM schedule_exam ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error('❌ Failed to fetch scheduled exams:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
