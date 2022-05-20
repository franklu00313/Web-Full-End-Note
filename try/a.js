let arr = ["Banana", "Apple", "Mongo"];

for (let i of arr) console.log(i); // Banana -> Apple -> Mongo
for (let i in arr) console.log(i); // 0 -> 1 -> 2

let ob = { name: "Frank", age: 20, height: 180 };
for (let i in ob) console.log(i); // name -> age -> height
for (let i in ob) console.log(ob[i]); // Frank -> 20 -> 180
