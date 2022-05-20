const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/testDB") //若沒有此 DB 會自動創建 (但要等到至少建立一個collection)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("connected to MongoDB failed");
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: [3, "name too short!"] },
});

const Person = mongoose.model("Person", personSchema);

// general (sync)
app.get("/sync", (req, res) => {
  res.sendddd("Hi,this is homepage!"); // error => 會跳到最後面的 error handler (不會在網站上看到噴error)
});

// async + await + try catch
app.get("/async", async (req, res, next) => {
  try {
    let foundUser = await Person.findOneeee({ name: "Ch" }); // 要記得寫await才抓的到
  } catch (error) {
    next(error);
  }
});

// .then().catch()
app.get("/thenCatch", (req, res, next) => {
  let Chieh = new Person({ name: "Ch" });
  Chieh.save()
    .then((data) => console.log(data))
    .catch((err) => next(err));
});

// review: page not found (route not found)
app.get("/*", (req, res) => {
  res.status(404).send("<h1>404 Page not found</h1>");
});

// error handler
app.use((e, req, res, next) => {
  res.status(500).send("<h1>Something wrong.</h1>");
  console.log(e);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
