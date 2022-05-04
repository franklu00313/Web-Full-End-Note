const fs = require("fs");

// sync outcome：start => data: Testing! => end
console.log("start");
const data = fs.readFileSync("fs.txt", "utf-8"); // blocks here until file is read
console.log("data:", data);
console.log("end");

// async outcome：start => end => fs.txt data: Testing!
console.log("start");
fs.readFile("fs.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log("fs.txt data:", data);
});
console.log("end");
