const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');

// Route: Generate questions from schedule_exam row
// Faculty/fetchPrompt.js
router.get('/exam-prompt/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.execute(
      'SELECT subject, topic, num_of_questions, difficulty_level FROM schedule_exam WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  
    const exam = rows[0];
    const prompt = `Generate ${exam.num_of_questions} ${exam.difficulty_level} level multiple choice questions on the topic "${exam.topic}" under subject "${exam.subject}". Return the output in JSON format with question, 4 options, and correct answer.`;
    
    res.json({ prompt });
  });
  
module.exports = router;
