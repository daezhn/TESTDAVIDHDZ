const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const STATS_PATH = path.join(__dirname, 'stats.json');

let stats = { teams: [] };

function loadStats() {
  try {
    if (fs.existsSync(STATS_PATH)) {
      const data = fs.readFileSync(STATS_PATH, 'utf8');
      stats = JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

function saveStats() {
  try {
    fs.writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error('Failed to save stats:', err);
  }
}

loadStats();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get stats
app.get('/stats', (req, res) => {
  res.json(stats);
});

// Endpoint to update stats
app.post('/stats', (req, res) => {
  stats = req.body;
  saveStats();
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
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
