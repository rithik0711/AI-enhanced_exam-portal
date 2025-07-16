const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// POST /student/generate-questions
router.post('/generate-questions', async (req, res) => {
  const { subject, topic, numQuestions, level } = req.body;

  // Build the prompt for Llama 3
  const prompt = `Generate ${numQuestions} multiple-choice questions on the topic "${topic}" in the subject "${subject}" for ${level} level students. Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]`;

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })
    });
    const data = await ollamaRes.json();
    // The response will be in data.response
    const questions = JSON.parse(data.response);
    res.json({ questions });
  } catch (err) {
    console.error('Ollama error:', err);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

module.exports = router;