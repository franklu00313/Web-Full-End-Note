const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    // 成功的話執行這裡
    console.log("Connected to MongoDB.");
  })
  .catch((e) => {
    // 失敗的話執行這裡
    console.log("Connected to MongoDB Failed.");
    console.log(e);
  });

// middleware
app.use(express.static("public")); // for static files

// create schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "name too short"],
    enum: ["frank", "Chieh"],
    lowercase: true,
    required: true,
  },
  age: { type: Number },
  score: { chinese: { type: Number }, english: { type: Number } },
});
// create model
const Student = mongoose.model("Student", studentSchema);

const Frank = new Student({
  name: "Frank",
  age: 20,
  score: { chinese: 100, english: 20 },
});
Frank.save()
  .then(() => {
    console.log("Frank is saved.");
  })
  .catch((e) => {
    console.log(e);
  });

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
