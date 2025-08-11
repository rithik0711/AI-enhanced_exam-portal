const axios = require('axios');

async function generateQuestions(prompt) {
  try {
    console.log('[generateQuestions] Sending prompt to Ollama...');
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "gemma:2b", // or your model
      prompt,
      format: "json",
      stream: false
    }, {
      timeout: 120000 // 2 minute timeout
    });

    if (response.data && response.data.response) {
      console.log('[generateQuestions] Received response string:', response.data.response);
      let questions;
      
      try {
        // First, try to parse the entire response as JSON
        questions = JSON.parse(response.data.response);
        console.log('[generateQuestions] Parsed entire response as JSON');
      } catch (parseError) {
        console.log('[generateQuestions] Failed to parse entire response, trying to extract JSON...');
        
        // Try to extract JSON object or array from the response
        const jsonMatch = response.data.response.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          console.log('[generateQuestions] Extracted JSON:', jsonMatch[0]);
          questions = JSON.parse(jsonMatch[0]);
        } else {
          console.log('[generateQuestions] No JSON found in response');
          return null;
        }
      }
      
      // Ensure we have an array of questions
      if (!Array.isArray(questions)) {
        questions = [questions];
      }
      
      console.log('[generateQuestions] Successfully processed questions.');
      return questions;
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('[generateQuestions] JSON Parsing Error:', error.message);
    } else if (error.code === 'ECONNABORTED') {
      console.error('[generateQuestions] Request timed out.');
    } else if (error.response) {
      console.error('[generateQuestions] Ollama API error:', error.response.status, error.response.data);
    } else {
      console.error('[generateQuestions] Error:', error.message);
    }
    return null;
  }
}

// Generate multiple questions by calling generateQuestions repeatedly
async function generateMultipleQuestions(prompt, count) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const result = await generateQuestions(prompt);
    if (result && result.length > 0) {
      questions.push(result[0]); // result is always an array
    }
  }
  return questions;
}

module.exports = { generateQuestions, generateMultipleQuestions };