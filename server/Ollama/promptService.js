const db = require('../db');

class PromptService {
  static async getPromptBySubject(subject, difficulty = 'All') {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ai_prompts WHERE (subject = ? OR subject = "General") AND (difficulty_level = ? OR difficulty_level = "All") ORDER BY subject = "General" ASC LIMIT 1',
        [subject, difficulty]
      );
      return rows[0];
    } catch (error) {
      console.error('Error fetching prompt by subject:', error);
      throw error;
    }
  }

  static buildPrompt(template, params) {
    let prompt = template;
    for (const [key, value] of Object.entries(params)) {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return prompt;
  }
}

module.exports = PromptService;
