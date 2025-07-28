const db = require('../db');

class SchedulePromptService {
  /**
   * Generate prompt directly from schedule_exam data
   * @param {number} examId - The exam ID from schedule_exam table
   * @returns {Promise<string>} - The generated prompt
   */
  static async generatePromptFromSchedule(examId) {
    try {
      // Fetch exam details from schedule_exam table
      const [rows] = await db.execute(
        'SELECT subject, topic, num_of_questions, difficulty_level FROM schedule_exam WHERE id = ?',
        [examId]
      );
      
      if (rows.length === 0) {
        throw new Error('Exam not found in schedule_exam table');
      }
      
      const { subject, topic, num_of_questions, difficulty_level } = rows[0];
      
      // Generate prompt directly from the exam data
      const prompt = `Generate ${num_of_questions} multiple-choice questions on the topic "${topic}" in the subject "${subject}" for ${difficulty_level} level students. Make sure questions are clear, relevant, and have exactly 4 options (A, B, C, D). Only output a JSON array in the following format, with no explanation or extra text: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]`;
      
      console.log('🔍 Generated prompt from schedule_exam:', {
        examId,
        subject,
        topic,
        num_of_questions,
        difficulty_level,
        prompt
      });
      
      return prompt;
    } catch (error) {
      console.error('❌ Error generating prompt from schedule:', error);
      throw error;
    }
  }

  /**
   * Get exam details from schedule_exam table
   * @param {number} examId - The exam ID
   * @returns {Promise<Object>} - Exam details
   */
  static async getExamDetails(examId) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM schedule_exam WHERE id = ?',
        [examId]
      );
      
      if (rows.length === 0) {
        throw new Error('Exam not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('❌ Error fetching exam details:', error);
      throw error;
    }
  }
}

module.exports = SchedulePromptService; 