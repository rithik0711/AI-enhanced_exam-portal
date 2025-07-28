const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../Ollama/generateQuestions');

// POST /student/generate-questions
router.post('/generate-questions', async (req, res) => {
  const { subject, topic, numQuestions, level } = req.body;

  // Build the prompt for Llama 3
  const prompt = `Generate ${numQuestions} multiple-choice questions on the topic "${topic}" in the subject "${subject}" for ${level} level students. Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]`;

  try {
    console.log('Ollama raw response:', response);
    const response = await generateQuestions(prompt);
    const questions = JSON.parse(response);
    res.json({ questions });
  } catch (err) {
    console.error('Ollama error:', err);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

module.exports = router;