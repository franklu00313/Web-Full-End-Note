const url = require("url");

const pandaUrl =
  "http://127.0.0.1:5501/myForm.html?InputName=Peter+Wang&gender=male&telephone=0900123456";

// 回傳一個Object，裡面包含很多資訊，可以印出來選取自己需要的資料即可
let parsedUrl = url.parse(pandaUrl, true);
console.log(parsedUrl);

console.log(parsedUrl.query); // 最常搭配表單(form)連用
