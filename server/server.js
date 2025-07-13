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

server.listen(5000, () => {
  console.log('🚀 Server started on port 5000');
});
