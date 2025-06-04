const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// In-memory database for team stats
let stats = {
  teams: [
    { name: 'Tigres', wins: 0, losses: 0 },
    { name: 'Pericos', wins: 0, losses: 0 },
  ],
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get stats
app.get('/stats', (req, res) => {
  res.json(stats);
});

// Endpoint to update stats
app.post('/stats', (req, res) => {
  stats = req.body;
  io.emit('statsUpdated', stats); // Notify all clients
  res.json({ status: 'ok' });
});

// Endpoint to download stats as JSON
app.get('/stats/export', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="stats.json"');
  res.json(stats);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('statsUpdated', stats); // Send current stats on new connection
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
