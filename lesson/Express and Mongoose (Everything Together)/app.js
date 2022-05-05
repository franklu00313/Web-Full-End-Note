const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Member = require("./modules/member");

app.use(express.static("public"));
app.set("view engine", "ejs"); // set up ejs as view engine 需要嗎(?
app.use(bodyParser.urlencoded({ extended: true })); // for form post

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

app.get("/members", async (req, res) => {
  try {
    let data = await Member.find();
    res.render("member.ejs", { data }); // find回傳的data是一個array，必須包成object才能傳出去
  } catch (e) {
    console.log(e);
    res.send("Error with finding data.");
  }
});

app.get("/members/insert", (req, res) => {
  res.render("insert.ejs");
});

app.post("/members/insert", (req, res) => {
  let { username, studentID, password } = req.body;
  let newMember = new Member({ username, studentID, password });
  newMember
    .save()
    .then(() => {
      console.log("Data saved to MongoDB.");
      res.render("accept.ejs");
    })
    .catch((e) => {
      res.render("reject.ejs");
      console.log(e);
    });
});

// member personal page
app.get("/members/:username", async (req, res) => {
  let { username } = req.params;
  try {
    let data = await Member.findOne({ username });
    data = {
      username: data.username,
      studentID: data.studentID,
      password: data.password,
    };
    res.render("memberPage.ejs", { data }); // 即使本身是物件還是要用物件包起來，前端取的時候data變數就代表目前obj的value
  } catch (e) {
    res.send("Error! (User not found)");
    console.log(e);
  }
});

// 404
app.get("/*", (req, res) => {
  res.status(404);
  res.send("Page not found.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
