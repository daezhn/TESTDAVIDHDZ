# Baseball Stats Server

This project provides a simple Express and Socket.IO server to share baseball statistics over your local network.

## Features

- Loads player statistics from `stats.json` at startup.
- Supports updating statistics via `POST /stats` and broadcasts changes with Socket.IO.
- Exports current statistics with `GET /stats/export`.
- Serves a small web page showing the stats in real time.
- The server listens on `0.0.0.0` so it can be accessed from other devices on the same LAN.

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Edit `stats.json` with your players and their `AVG`, `CP` (carreras producidas) and `HR` values.
3. Start the server:
   ```bash
   npm start
   ```
4. Open a browser on another device in your LAN and navigate to `http://<server-ip>:3000` to view the statistics.

## Updating Stats

Send a `POST` request with a JSON body to `http://<server-ip>:3000/stats` to update all statistics. The server saves changes back to `stats.json`.
