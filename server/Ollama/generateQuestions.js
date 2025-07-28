const axios = require('axios');
async function generateQuestions(prompt) {
  try {
    console.log('🟡 [generateQuestions] Sending prompt to Ollama:', prompt);
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "llama3",
      prompt,
      stream: false
    });
    console.log('🟢 [generateQuestions] Raw Ollama response:', response.data);
    if (response.data && response.data.response) {
      console.log('🟢 [generateQuestions] Ollama response.response:', response.data.response);
    } else {
      console.warn('⚠️ [generateQuestions] Ollama response missing .response field:', response.data);
    }
    return response.data.response;
  } catch (error) {
    if (error.response) {
      console.error('❌ [generateQuestions] Ollama API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ [generateQuestions] No response from Ollama API:', error.request);
    } else {
      console.error('❌ [generateQuestions] Error setting up request:', error.message);
    }
    throw new Error('Failed to generate questions from Ollama');
  }
}
module.exports = { generateQuestions };


// File: generateQuestions.js

// const axios = require('axios');

// async function generateQuestions(prompt) {
//   try {
//     const response = await axios.post('http://localhost:11434/api/generate', {
//       model: "llama3",
//       prompt,
//       // 👇 THE FIX: Add this line to force JSON output
//       format: "json", 
//       stream: false
//     });

//     // Now, response.data.response will be a clean JSON string
//     console.log('Raw JSON string from Ollama:', response.data.response);
    
//     // You can parse it here or in the calling function
//     return response.data.response;

//   } catch (error) {
//     console.error('Error generating questions from Ollama:', error);
//     throw new Error('Failed to generate questions from Ollama');
//   }
// }

// module.exports = { generateQuestions };