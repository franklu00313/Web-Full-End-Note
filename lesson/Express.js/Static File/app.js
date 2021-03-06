const express = require("express");
const app = express();
const path = require("path");

// middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000);
