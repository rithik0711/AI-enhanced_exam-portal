# Ollama Integration for AI Exam Portal

This directory contains the AI integration components for generating exam questions using Ollama.

## Components

### 1. generateQuestions.js
- Core function to interact with Ollama API
- Generates questions based on provided prompts

### 2. generateQuestionsWithDBPrompt.js
- Legacy system that uses `ai_prompts` table
- Fetches prompt templates from database and generates questions

### 3. schedulePromptService.js (NEW)
- **Primary system for generating prompts from scheduled exams**
- Generates prompts directly from `schedule_exam` table data
- Does NOT use `ai_prompts` table
- Used when students start exams

### 4. promptService.js
- Legacy service for managing `ai_prompts` table
- Used by the old system

## API Endpoints

### New Schedule-Based Endpoints

#### POST `/api/generate-questions-from-schedule/:examId`
- **Purpose**: Generate questions directly from scheduled exam data
- **Source**: Uses `schedule_exam` table, NOT `ai_prompts` table
- **Parameters**: `examId` (from URL)
- **Returns**: JSON array of questions

#### GET `/api/exam-details/:examId`
- **Purpose**: Get exam details from schedule_exam table
- **Parameters**: `examId` (from URL)
- **Returns**: Exam details object

### Legacy Endpoints (Still Available)

#### POST `/api/generate-questions-db`
- **Purpose**: Generate questions using ai_prompts table
- **Parameters**: `{ subject, topic, numQuestions, level }`
- **Returns**: JSON array of questions

## How It Works

### When Student Starts Exam:

1. **Frontend** (`ExamInterface.jsx`) calls `/api/generate-questions-from-schedule/:examId`
2. **Backend** (`schedulePromptService.js`) fetches exam details from `schedule_exam` table
3. **Backend** generates prompt using exam data:
   ```
   Generate {num_of_questions} multiple-choice questions on the topic "{topic}" 
   in the subject "{subject}" for {difficulty_level} level students...
   ```
4. **Backend** calls Ollama with the generated prompt
5. **Frontend** receives and displays the questions

### Example Flow:

```
Student clicks "Start Exam" 
→ Exam.jsx passes exam data to Rules.jsx 
→ Rules.jsx passes to ExamInterface.jsx 
→ ExamInterface.jsx calls /api/generate-questions-from-schedule/{examId}
→ schedulePromptService.js fetches from schedule_exam table
→ Generates prompt: "Generate 5 multiple-choice questions on Binary Tree in Data Structures for easy level..."
→ Ollama generates questions
→ Questions displayed to student
```

## Database Tables

### schedule_exam (Primary Source)
```sql
CREATE TABLE schedule_exam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  topic VARCHAR(100),
  num_of_questions INT,
  timing TIME,
  difficulty_level VARCHAR(50),
  total_marks INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ai_prompts (Legacy - Not Used for Student Exams)
```sql
CREATE TABLE ai_prompts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  difficulty_level VARCHAR(50),
  prompt_template TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing

Run the test script to verify the new system:

```bash
cd server
node test-schedule-prompt.js
```

This will test:
1. Fetching exam details from schedule_exam
2. Generating prompts from exam data
3. Generating questions using Ollama

## Migration Notes

- The new system is **active by default** for student exams
- The old system using `ai_prompts` table is still available for backward compatibility
- Faculty can still use the old system if needed
- Students now use the new schedule-based system exclusively 