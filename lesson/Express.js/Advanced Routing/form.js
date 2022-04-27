const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "formIndex.html"));
});

// form handling (GET)
app.get("/formGet", (req, res) => {
  console.log(req.query); // { Name: 'Chieh', age: '24' }
  let { Name, age } = req.query;
  res.send(`${Name} is ${age} years old! (by Get)`);
});

// form handling (POST)
app.post("/formPost", (req, res) => {
  console.log(req.body); // { Name: 'Chieh', age: '24' }
  let { Name, age } = req.body;
  res.send(`${Name} is ${age} years old! (by Post)`);
});

app.listen(3000);
