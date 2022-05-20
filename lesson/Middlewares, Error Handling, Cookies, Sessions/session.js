require("dotenv").config(); // 盡量寫在 app.js 的最上方
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

// middleware
app.use(
  session({
    secret: process.env.SECRET, // 環境變數
    resave: false,
    saveUninitialized: false, // 直到使用session功能才會出現 connect_sid 在 cookies
  })
);
app.use(flash()); // 記得要寫在 session 的 middleware 之後

// router
app.get("/login", (req, res) => {
  req.session.isVerified = true;
  res.send("Hello World!");
});

app.get("/secret", (req, res) => {
  if (req.session.isVerified == true) {
    res.send("<h1>You can see my Secret!</h1>");
  } else {
    res.send("<h1>You can't see my Secret!</h1>");
  }
});

app.get("/flash", (req, res) => {
  req.flash("success_msg", "You are logged in!");
  req.flash("success_msg", "You are logged in2!");
  // 因為使用一次就消失，如果想重複使用要先存起來 (上面兩次會變成一個array，但還是只能顯示一次)
  let a = req.flash("success_msg"); // a會是一個陣列
  console.log(a[0], a[1]); // You are logged in! You are logged in2!
  res.send(req.flash("success_msg")); // 啥都印不出來
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
