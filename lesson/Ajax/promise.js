// resolve (success)
let resolveExample = new Promise((resolve, reject) => {
  resolve({ data: "data from DB" });
});

resolveExample
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// reject (failure)
let rejectExample = new Promise((resolve, reject) => {
  reject(new Error("Something wrong!"));
});

rejectExample.then((data) => console.log(data)).catch((e) => console.log(e));
