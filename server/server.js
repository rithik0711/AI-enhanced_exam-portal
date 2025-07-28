const express = require('express');
const http = require('http');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});
const { generateQuestions } = require('./Ollama/generateQuestions');
const { generateQuestionsWithDBPrompt } = require('./Ollama/generateQuestionsWithDBPrompt');
const SchedulePromptService = require('./Ollama/schedulePromptService');

app.use(cors());
// Increase payload limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// AI route
// const aiRoutes = require('./routes/aiRoutes');
// app.use('/api/ai', aiRoutes);

// 🟢 Faculty routes
const scheduleExamRoute = require('./Faculty/scheduleExam');
const uploadQBRoute = require('./Faculty/uploadQB'); // ✅ PDF upload
const fetchQBRoute = require('./Student/fetchQB');
app.use('/student', fetchQBRoute); // 🟢 Register route

app.use('/faculty', scheduleExamRoute);
app.use('/faculty', uploadQBRoute); // ✅ Handles POST /faculty/upload
const scheduleFetchRoute = require('./Student/fetchSchedule');
app.use('/', scheduleFetchRoute);


// WebSocket handling
let activeRecordings = new Map();
let socketClients = new Map();

io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  socket.on('register-session', (sessionId) => {
    socketClients.set(sessionId, socket);
    console.log(`📡 Registered socket for session: ${sessionId}`);
  });

  socket.on('disconnect', () => {
    for (const [sessionId, sock] of socketClients.entries()) {
      if (sock.id === socket.id) {
        socketClients.delete(sessionId);
        console.log(`❌ Disconnected socket from session: ${sessionId}`);
        break;
      }
    }
  });
});

const axios = require('axios');

async function callLlama3(prompt) {
  const res = await axios.post('http://localhost:11434/api/generate', {
    model: "llama3",
    prompt,
    stream: false
  });

  return res.data.response;
}

app.use(express.json());

const questionGen = require('./Student/questionGen');
const evaluateAnswers = require('./Student/evaluateAnswers');

app.use('/student', questionGen);
app.use('/student', evaluateAnswers);

// Question generation endpoints
const PromptService = require('./Ollama/promptService');

// Generate questions with hardcoded prompt (legacy)
app.post('/api/generate-questions', async (req, res) => {
  const { topic, numQuestions } = req.body;
  const prompt = `Generate ${numQuestions} multiple-choice questions on the topic: ${topic}. Provide options and the correct answer.`;

  try {
    const questions = await generateQuestions(prompt);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

// Generate questions with database prompt (new)
app.post('/api/generate-questions-db', async (req, res) => {
  const { subject, topic, numQuestions, level } = req.body;

  if (!subject || !topic || !numQuestions || !level) {
    return res.status(400).json({ error: 'Missing required fields: subject, topic, numQuestions, level' });
  }

  try {
    const questions = await generateQuestionsWithDBPrompt({
      subject,
      topic,
      numQuestions,
      level
    });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate questions: ' + error.message });
  }
});

// Prompt management endpoints
app.get('/api/prompts', async (req, res) => {
  try {
    const prompts = await PromptService.getAllPrompts();
    res.json({ prompts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

app.post('/api/prompts', async (req, res) => {
  try {
    const promptId = await PromptService.createPrompt(req.body);
    res.json({ message: 'Prompt created successfully', id: promptId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});

app.put('/api/prompts/:id', async (req, res) => {
  try {
    await PromptService.updatePrompt(req.params.id, req.body);
    res.json({ message: 'Prompt updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

app.delete('/api/prompts/:id', async (req, res) => {
  try {
    await PromptService.deletePrompt(req.params.id);
    res.json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete prompt' });
  }
});

// Get exam details from schedule endpoint
app.get('/api/exam-details/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    const examDetails = await SchedulePromptService.getExamDetails(examId);
    res.json(examDetails);
  } catch (error) {
    console.error('❌ Error fetching exam details:', error);
    res.status(500).json({ error: 'Failed to fetch exam details: ' + error.message });
  }
});

// Generate questions from schedule endpoint
app.post('/api/generate-questions-from-schedule/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    // Generate prompt directly from schedule_exam data using the new service
    const prompt = await SchedulePromptService.generatePromptFromSchedule(examId);
    
    // Generate questions using the prompt
    const questions = await generateQuestions(prompt);
    
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = questions.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ Parsed questions from schedule:', parsed);
        return res.json(parsed);
      } else {
        // If no JSON array found, try parsing the whole response
        const parsed = JSON.parse(questions);
        console.log('✅ Parsed questions (whole response):', parsed);
        return res.json(parsed);
      }
    } catch (err) {
      console.warn('⚠️ JSON parse failed. Returning raw response.');
      console.error('Parse error:', err.message);
      console.log('Raw response:', questions);
      return res.json(questions);
    }
  } catch (error) {
    console.error('❌ Error generating questions from schedule:', error);
    res.status(500).json({ error: 'Failed to generate questions: ' + error.message });
  }
});

server.listen(5000, () => {
  console.log('🚀 Server started on port 5000');
});