let night = (name) => {
  console.log("Good night, " + name);
};

// 寫法1
exports.night = night; // exports.[output的物件命名] = [function名稱]
