const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// POST /student/evaluate-answers
router.post('/evaluate-answers', async (req, res) => {
  const { questions, studentAnswers } = req.body;

  // Build the prompt for Llama 3
  const prompt = `
You are an exam evaluator. For each question and student answer, give a score (1 for correct, 0 for incorrect) and a short feedback.
Questions: ${JSON.stringify(questions)}
Student Answers: ${JSON.stringify(studentAnswers)}
Return as JSON: [{"question": "...", "studentAnswer": "...", "score": 1, "feedback": "..."}]
`;

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
    const evaluation = JSON.parse(data.response);
    res.json({ evaluation });
  } catch (err) {
    console.error('Ollama error:', err);
    res.status(500).json({ error: 'Failed to evaluate answers' });
  }
});

module.exports = router;