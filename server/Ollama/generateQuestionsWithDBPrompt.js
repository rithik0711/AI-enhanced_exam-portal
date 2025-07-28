const { generateQuestions } = require('./generateQuestions');
const PromptService = require('./promptService');

async function generateQuestionsWithDBPrompt({ subject, topic, numQuestions, level }) {
  try {
    let promptTemplateRow = await PromptService.getPromptBySubject(subject, level);
    let template;
    if (!promptTemplateRow) {
      // Improved fallback template for strict JSON output
      template = 'Generate {numQuestions} multiple-choice questions on the topic "{topic}" in the subject "{subject}" for {level} level students. Only output a JSON array in the following format, with no explanation or extra text: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]';
      console.log('Using fallback prompt template:', template);
    } else {
      template = promptTemplateRow.prompt_template;
    }

    const prompt = PromptService.buildPrompt(template, {
      subject,
      topic,
      numQuestions,
      level,
    });
    
    console.log('🔍 Generated prompt:', prompt);

    const response = await generateQuestions(prompt);
    console.log('🟢 Raw Ollama response:', response);

    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ Parsed questions:', parsed);
        return parsed;
      } else {
        // If no JSON array found, try parsing the whole response
        const parsed = JSON.parse(response);
        console.log('✅ Parsed questions (whole response):', parsed);
        return parsed;
      }
    } catch (err) {
      console.warn('⚠️ JSON parse failed. Returning raw response.');
      console.error('Parse error:', err.message);
      console.log('Raw response:', response);
      return response;
    }
  } catch (error) {
    console.error('❌ Error generating questions:', error.message);
    throw error;
  }
}

module.exports = { generateQuestionsWithDBPrompt };
