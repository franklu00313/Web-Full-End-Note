const express = require("express");
const app = express(); // app為命名慣例
const path = require("path"); // for sendFile 要用到 path.join

// Homepage Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // 可傳送整個HTML檔案
});
// Subpage Routing

app.get("/Chieh", (req, res) => {
  res.send({ name: "Chieh", Height: 180 }); // 也可以傳送物件
});

// Other(Not Found Routing)
app.get("*", (req, res) => {
  res.send("<h1>Sorry! Page not found.</h1>"); // 也可傳送HTML CODE
});

//which port does server listen to
app.listen(3000);

// 因為是剩下全部都到這，因此路徑設定"/" or "/*" 都可以，但前面幾個一定要記得加 "/" 代表首頁
