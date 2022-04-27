// 測試網址輸入：http://localhost:3000/Chieh/180

const express = require("express");
const app = express();

// routing for pattern ()
app.get("/:name/:height", (req, res) => {
  console.log(req.params); // { name: 'Chieh', height: '180' }
  let { name, height } = req.params; // Object Destruction
  res.send(`<h1>${name} is ${height} cm tall !</h1>`); // Backstick
});

app.listen(3000);
