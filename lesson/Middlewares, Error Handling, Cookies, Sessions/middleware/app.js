const express = require("express");
const app = express();

// middleware (要有request，才會執行這些middleware)
app.use((req, res, next) => {
  console.log("This is the first middleware.");
  next(); // 要有next，才可以呼叫下一個middleware
});

app.use((req, res, next) => {
  console.log("This is the second middleware.");
  res.send("Hi,this is homepage!");

  next();
});

// 當真的收到request才會執行 middleware (即使路徑不存在，網頁跑不出來也會執行middleware)
app.get("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
