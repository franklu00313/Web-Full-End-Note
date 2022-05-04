function sayHi() {
  console.log("Hi");
}

console.log("start");
setTimeout(sayHi, 2000);
console.log("end");
// outcome：start => end => Hi
