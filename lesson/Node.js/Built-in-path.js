const path = require("path");

// 將路徑合併，通常是__dirname + 檔名
console.log(path.join(__dirname, "test.js")); // c:\git project\Web-Full-End-Note\lesson\node.js\test.js

// 印出副檔名
console.log(path.extname(__filename)); // .js

// 印出檔案的完整名稱 (等同將__filename前面的路徑去掉)
console.log(path.basename(__filename)); //Built-in Modules.js
