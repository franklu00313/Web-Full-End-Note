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

// create an instance method (要放在 create schema之後、create model 之前)
studentSchema.methods.sumScore = function () {
  return this.score.chinese + this.score.english;
};

// create model
const Student = mongoose.model("Student", studentSchema);

// 將 collection 裡面全部的學生，每個學生分數加總後印出來
Student.find({}).then((arr) => {
  arr.forEach((oneStudent) => {
    console.log(`${oneStudent.name}'s total score is ${oneStudent.sumScore()}`);
  });
});

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
