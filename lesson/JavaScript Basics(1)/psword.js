// pseudocode
// 1. 外面包一個while，等到猜到之後才跳
// 2. 設定start end兩個變數，從開始到結束逐漸內縮
// (有兩種情況，改end範圍往前縮、改start範圍往後縮)

let start = 0,
  end = 99;
let ans = 100 * Math.random();
ans = Math.floor(ans);
console.log(ans);
while (true) {
  let guess = prompt("猜一個數字! (" + start + "~" + end + ")");
  guess = Number(guess);
  if (isNaN(guess)) {
    alert("請輸入阿拉伯數字!!");
    continue;
  } else if (guess > end || guess < start) {
    alert("請輸入範圍中的數字!");
    continue;
  } else {
    if (guess == ans) {
      alert("Correct Answer!");
      break;
    } else if (guess > ans) {
      end = guess;
    } else if (guess < ans) {
      start = guess;
    }
  }
}
