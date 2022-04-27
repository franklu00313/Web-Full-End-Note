function morning(name) {
  console.log("Good morning, " + name);
}

function afternoonFunc(name) {
  console.log("Good afternoon, " + name);
}

// 寫法2：{output的物件命名:function名稱} (必須用module.exports，不能縮寫成exports)
module.exports = { morning: morning, afternoon: afternoonFunc }; //一次加入，要小心會把原本的export物件全部覆蓋掉
