-- Create AI prompts table
CREATE TABLE IF NOT EXISTS ai_prompts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  difficulty_level VARCHAR(50) DEFAULT 'All',
  prompt_template TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default prompts
INSERT INTO ai_prompts (subject, difficulty_level, prompt_template) VALUES
('DBMS', 'Easy', 'Generate {numQuestions} easy multiple-choice questions on the topic "{topic}" in Database Management Systems. Focus on basic concepts like tables, relationships, and simple queries. Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]'),

('DBMS', 'Medium', 'Generate {numQuestions} medium difficulty multiple-choice questions on the topic "{topic}" in Database Management Systems. Include questions about normalization, SQL queries, and database design principles. Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]'),

('DBMS', 'Hard', 'Generate {numQuestions} advanced multiple-choice questions on the topic "{topic}" in Database Management Systems. Include complex scenarios, optimization, transactions, and advanced SQL concepts. Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]'),

('General', 'All', 'Generate {numQuestions} multiple-choice questions on the topic "{topic}" in the subject "{subject}" for {level} level students. Make sure questions are clear, relevant, and have exactly 4 options (A, B, C, D). Format as JSON: [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]'); 