const express = require('express');
const router = express.Router();
const { generateMultipleQuestionsWithGemini } = require('../Ollama/generateQuestionsWithGemini');

// POST /student/generate-questions
router.post('/generate-questions', async (req, res) => {
  const { subject, topic, numQuestions, level } = req.body;

  // Build the prompt for a single question
  const prompt = `Generate 1 multiple-choice question on the topic "${topic}" in the subject "${subject}" for ${level} level students. Only output a JSON object in the following format, with no explanation or extra text: {"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}`;

  try {
    const questions = await generateMultipleQuestionsWithGemini(prompt, numQuestions);
    console.log('Gemini generated questions:', questions);
    res.json({ questions });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

module.exports = router;