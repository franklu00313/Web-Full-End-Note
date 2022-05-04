const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs"); // set up ejs as view engine 需要嗎(?
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/testDB") //若沒有此 DB 會自動創建 (但要等到至少建立一個collection)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("connected to MongoDB failed");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
