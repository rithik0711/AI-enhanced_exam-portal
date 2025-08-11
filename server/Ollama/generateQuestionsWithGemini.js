// ./Ollama/generateQuestionsWithGemini.js

require('dotenv').config(); // Load .env variables
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ 1. Check if the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function generateQuestionsWithGemini(prompt) {
  try {
    console.log('[generateQuestionsWithGemini] Sending prompt to Gemini...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // ✅ 2. Simplify parsing. The function's job is to return a valid JS object or throw an error.
    // The prompt asks for JSON, so we expect JSON.
    const jsonMatch = text.match(/\[[\s\S]*\]/); // Find the JSON array in the text
    if (jsonMatch && jsonMatch[0]) {
        const parsedQuestions = JSON.parse(jsonMatch[0]);
        console.log('✅ [generateQuestionsWithGemini] Successfully parsed questions.');
        return parsedQuestions; // Return the parsed array
    } else {
        throw new Error("No valid JSON array found in Gemini's response.");
    }
  } catch (error) {
    console.error('[generateQuestionsWithGemini] Error:', error.message);
    // Return null or re-throw the error to let the caller handle it.
    return null;
  }
}

// NOTE: This function calls the one above repeatedly. This can be slow and expensive.
// A better approach is to ask the model for all questions in a single prompt,
// which your `generatePromptFromSchedule` already does.
// This `generateMultipleQuestionsWithGemini` function is likely not needed anymore.
async function generateMultipleQuestionsWithGemini(prompt, count) {
  // ... (This function can likely be removed if not used elsewhere)
}

module.exports = { 
  generateQuestionsWithGemini, 
  generateMultipleQuestionsWithGemini 
};