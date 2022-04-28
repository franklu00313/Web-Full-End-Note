const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // for app.post()

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// form
app.post("/form", (req, res) => {
  // let { name, age } = req.body;
  console.log(req.body);
  res.render("form.ejs", req.body);
});

// array of object (simulate database)
app.get("/array", (req, res) => {
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 8.6, popularity: 8.2, trending: "same" },
    { name: "C++", rating: 6.6, popularity: 7.7, trending: "same" },
    { name: "PHP", rating: 2.5, popularity: 4.7, trending: "decreasing" },
    { name: "JavaScript", rating: 8.5, popularity: 8.1, trending: "same" },
  ];
  res.render("array.ejs", { languages }); // 實際是pass {languages:languages} 這個裝array的obj出去
});

// pattern => 要放最後面，不然會把/array的路徑蓋過去
app.get("/:name", (req, res) => {
  let { name } = req.params;
  res.render("name.ejs", { name });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
