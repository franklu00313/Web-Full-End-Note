// constructor function
function Person(name, age, height, weight) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.weight = weight;
  this.sayHi = function () {
    console.log("Hi, I'm " + this.name);
  };
}

Person.prototype.intro = function () {
  console.log("I'm " + this.name + " and I'm " + this.age + " years old.");
};

let Frank = new Person("Frank", 30, 180, 80);
Frank.sayHi(); // Hi, I'm Frank
let Chieh = new Person("Chieh", 25, 170, 70);
Chieh.sayHi(); // //Hi, I'm Chieh
Chieh.intro(); // I'm Chieh and I'm 25 years old.

console.log(Chieh);
