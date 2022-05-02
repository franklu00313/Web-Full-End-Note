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
  name: String,
  age: Number,
  score: { chinese: Number, english: Number },
});
// create model
const Student = mongoose.model("Student", studentSchema);

// find all objects in student，回傳array (若沒有符合的，則回傳空array)
Student.find({ name: "Chieh" }).then((data) => {
  console.log(data);
});

// find the first obeject，回傳 object (若沒有符合的，則回傳null)
Student.findOne({ name: "Chieh" }).then((data) => {
  console.log(data);
});

// 找出所有中文成績高於60分的學生
Student.find({ "score.chinese": { $gte: 60 } }).then((data) => {
  console.log(data);
});

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
