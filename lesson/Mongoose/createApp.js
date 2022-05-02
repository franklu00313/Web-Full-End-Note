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
// new object
const Chieh = new Student({
  name: "Chieh",
  age: 24,
  score: { chinese: 80, english: 100 },
});
// save to collection <students>
Chieh.save()
  .then(() => {
    console.log("Document has been saved.");
  })
  .catch(() => {
    console.log("Document saved failed.");
  });

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
