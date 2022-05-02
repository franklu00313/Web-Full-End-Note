const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");

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

// middleware
studentSchema.pre("save", () => {
  fs.appendFile("log.txt", "Data is going to be saved.\n", async (e) => {
    if (e) throw e;
  });
});

studentSchema.post("save", () => {
  fs.appendFile("log.txt", "Data has been saved.\n", async (e) => {
    if (e) throw e;
  });
});

// create model
const Student = mongoose.model("Student", studentSchema);

const Shuan = new Student({
  name: "Shuan",
  age: "A22",
  score: { chinese: 100, english: 100 },
});

Shuan.save()
  .then(() => {
    console.log("Data saved.");
  })
  .catch((e) => {
    console.log("Data not saved.");
    fs.appendFile("log.txt", "Something went wrong when saving.\n", (e) => {
      if (e) throw e;
    });
  });

// routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
