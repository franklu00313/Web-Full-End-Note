const express = require("express");
const app = express();

// middleware (要有request，才會執行這些middleware)
const middleware1 = (req, res, next) => {
  console.log("This is the first middleware.");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("This is the second middleware.");
  next();
};

// 當真的收到request才會執行 middleware (即使路徑不存在，網頁跑不出來也會執行middleware)
app.get("/a", middleware1, middleware2, (req, res) => {
  res.send("Hi,this is pageA!");
});

app.get("/b", middleware2, (req, res) => {
  res.send("Hi,this is pageB!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
