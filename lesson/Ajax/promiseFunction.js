function getData(name) {
  if (name == "Chieh") {
    // promise 要記得 return .then 才抓的到!
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ name: "Chieh", age: Math.ceil(Math.random() * 100) });
      }, 2000);
    });
  } else {
    return new Promise((resolve, reject) => {
      // arrow function 只有一行可以不用加大括號，若有輸出也會自動return (分號也要一併省略)
      setTimeout(() => reject(new Error("Name not found in DB.")), 2000);
    });
  }
}

function getMovies(age) {
  if (age < 18) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Cartoons"), 2000);
    });
  } else if (age < 100) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Movies"), 2000);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Too old")), 2000);
    });
  }
}

getData("Chieh")
  .then((data) => {
    console.log(data); // 記得getData 回傳的是一個object，而getMovies要的是其中的property:age
    return getMovies(data.age); // 要記得 return，下一個 .then() 才接的到
  })
  .then((msg) => console.log(msg)) // 一行省略{;} => 自動return
  .catch((e) => console.log(e)); // 不管是哪一個function的error都有可能catch到，若都發生就看哪個先

// async await try catch 寫法
async function showMovies() {
  try {
    const data = await getData("Chieh");
    console.log(data);
    const msg = await getMovies(data.age);
    console.log(msg);
  } catch (e) {
    console.log("await error");
    console.log(e);
  }
}
showMovies();
