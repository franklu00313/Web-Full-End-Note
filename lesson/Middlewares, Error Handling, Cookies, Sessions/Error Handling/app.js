const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hi,this is homepage!"); // 沒問題 => 就會正常執行
});

app.get("/wrong", (req, res) => {
  res.sendddd("Hi,this is homepage!"); // error => 會跳到最後面的 error handler (不會在網站上看到噴error)
});

// error handler
app.use((e, req, res, next) => {
  res.status(500).send("<h1>Something wrong.</h1>");
  console.log(e);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
