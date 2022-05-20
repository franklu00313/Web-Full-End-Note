const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); // 要有這行才有辦法讀取cookie

// middleware
app.use(cookieParser("secret")); // string 就是所加的簽章

app.get("/write", (req, res) => {
  res.cookie("key1", "value1"); // 加一個cookie key:value pair
  res.cookie("key2", "value2");
  res.cookie("key3", "value3", { signed: true }); // 加上signed:true, 就會加上簽章
  res.cookie("key4", "value4", { signed: true });
  res.send("write");
});

app.get("/read", (req, res) => {
  console.log(req.cookies); // { key2: 'value2', key1: 'value1' }
  console.log(req.signedCookies); // { key3: 'value3', key4: 'value4' }
  res.send("read");
});

// 用key值來清除 cookie (有沒有簽章都適用)
app.get("/clear", (req, res) => {
  res.clearCookie("key1");
  res.clearCookie("key3");
  res.send("clear");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
