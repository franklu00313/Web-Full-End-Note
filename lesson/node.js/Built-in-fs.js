const fs = require("fs");

// 在test.txt內寫內容，若原本有內容會直接覆蓋!
fs.writeFile("test.txt", "I'm happy now!\n", (e) => {
  if (e) throw e;
  else console.log("Sentence has been written!");
});

// 類似 writeFile，但不會覆蓋而是加在後面
fs.appendFile("test.txt", "I'm happy now!", (e) => {
  if (e) throw e;
  else console.log("Sentence has been added!");
});

// function 多收一個變數，代表讀取到的東西
fs.readFile("test.txt", "utf8", (e, data) => {
  if (e) throw e;
  console.log(data);
});

// 最終test.txt裡面有:
// I'm happy now!
// I'm happy now!
