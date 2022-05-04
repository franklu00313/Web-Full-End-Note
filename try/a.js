// function a() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("apple"), 2000);
//   });
// }

// function b() {
//   setTimeout(() => "apple", 2000);
// }

// async function aSync() {
//   let aa = await b();
//   console.log(aa);
// }

// aSync();

function promiseFn(num, time = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      num ? resolve(`${num}, 成功`) : reject("失敗");
    }, time);
  });
}

async function getData2() {
  try {
    // 專注在成功
    const data1 = await promiseFn(1);
    const data2 = await promiseFn(0);
    console.log(data1, data2);
  } catch (err) {
    // 專注在錯誤
    console.log("catch", err);
  }
  try {
    // 專注在成功
    const data1 = await promiseFn(1);
    const data2 = await promiseFn(10);
    console.log(data1, data2);
  } catch (err) {
    // 專注在錯誤
    console.log("catch", err);
  }
}
getData2();
