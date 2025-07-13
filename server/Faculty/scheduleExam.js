const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust if your db path is different

router.post('/schedule', async (req, res) => {
    const { subject, topic, num_of_questions, timing, difficulty_level, total_marks } = req.body;
  
    if (!subject || !topic || !num_of_questions || !timing || !difficulty_level || !total_marks) {
      console.log("❌ Missing fields", req.body); // <--- Add this line
      return res.status(400).json({ message: 'Missing fields' });
    }
  
    try {
      console.log("📥 Inserting exam with data:", req.body); // <--- Add this line
      await db.execute(
        'INSERT INTO schedule_exam (subject, topic, num_of_questions, timing, difficulty_level, total_marks) VALUES (?, ?, ?, ?, ?, ?)',
        [subject, topic, num_of_questions, timing, difficulty_level, total_marks]
      );
      res.status(200).json({ message: 'Exam scheduled successfully' });
    } catch (err) {
      console.error('❌ DB insert failed:', err); // Already exists
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
