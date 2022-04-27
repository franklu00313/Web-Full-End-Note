const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 302 Found
app.get("/Chieh", (req, res) => {
  res.status(302);
  res.sendFile(path.join(__dirname, "302.html"));
});

// 404 Not Found
app.get("*", (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "404.html"));
});

app.listen(3000);
