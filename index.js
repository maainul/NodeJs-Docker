const express = require("express");

const app = express();

function logWithTimestamp(message) {
  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString([], { hour12: true })
  console.log(`[${date}, ${time}] ${message}`)
}

app.get("/", async (req, res) => {
  logWithTimestamp("Home API Called");
  return res.json({ status: 201, body: "Home Message" })
});

app.get("/message", async (req, res) => {
  logWithTimestamp("Message API Called");
  return res.json({ status: 201, body: "Get Message" })
});

module.exports = app;
