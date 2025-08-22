const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

// Import your Gemini function and Services
const { generateQuestionsWithGemini } = require('./Ollama/generateQuestionsWithGemini');
const SchedulePromptService = require('./Ollama/schedulePromptService');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🟢 Routes
const scheduleExamRoute = require('./Faculty/scheduleExam');
const uploadQBRoute = require('./Faculty/uploadQB');
const modifyExamRoute = require('./Faculty/ModifyExam');
const fetchQBRoute = require('./Student/fetchQB');
const scheduleFetchRoute = require('./Student/fetchSchedule');
const questionGen = require('./Student/questionGen');
const evaluateAnswers = require('./Student/evaluateAnswers');

app.use('/faculty', scheduleExamRoute);
app.use('/faculty', uploadQBRoute);
app.use('/student', fetchQBRoute);
app.use('/', scheduleFetchRoute);
app.use('/', modifyExamRoute);
app.use('/student', questionGen);
app.use('/student', evaluateAnswers);


// WebSocket handling (no changes needed here)
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

// ❌ The old callLlama3 function is no longer needed
// const axios = require('axios');
// async function callLlama3(prompt) { ... }


// --- Question Generation & Prompt Management Endpoints ---

// ✅ KEEP THIS VERSION of the route. This is your new, intended logic.
// in server.js

app.post('/api/generate-questions-from-schedule/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    // 1. Generate prompt from schedule details (This is correct)
    const prompt = await SchedulePromptService.generatePromptFromSchedule(examId);
    
    // 2. Generate questions. This now returns a parsed array or null.
    const questions = await generateQuestionsWithGemini(prompt);
    
    // ✅ 3. SIMPLIFIED LOGIC: Check the result and send it.
    if (questions) {
      console.log('✅ Successfully received parsed questions, sending to client.');
      res.json(questions); // 'questions' is already a valid JavaScript array
    } else {
      // This handles the case where Gemini failed or returned invalid data
      res.status(500).json({ error: 'Failed to generate questions from the AI model.' });
    }

  } catch (error) {
    console.error('❌ Error in /generate-questions-from-schedule endpoint:', error);
    res.status(500).json({ error: 'Failed to generate questions: ' + error.message });
  }
});

// Other endpoints (return Not Implemented until wired up)
app.post('/api/generate-questions-db', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
app.get('/api/prompts', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
app.post('/api/prompts', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
app.put('/api/prompts/:id', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
app.delete('/api/prompts/:id', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});
app.get('/api/exam-details/:examId', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// ❌ REMOVE THE DUPLICATE ROUTE DEFINITION THAT WAS HERE

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Set a different PORT or free the port.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});