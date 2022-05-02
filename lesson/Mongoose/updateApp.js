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

//updateOne，將第一個符合名字為Chieh的改為15歲
let query = { name: "Chieh" }; // 把query拿出來寫可讀性稍好一點
Student.updateOne(query, { age: 15 }).then((msg) => {
  console.log(msg);
});

//updateMany
Student.updateMany(query, { age: 200 }).then((msg) => {
  console.log(msg);
});

//findOneAndUpdate
Student.findOneAndUpdate(query, { age: 30 }, { new: true }).then((msg) => {
  console.log(msg);
});

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
