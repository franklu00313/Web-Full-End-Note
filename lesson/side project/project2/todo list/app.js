let button = document.querySelector("button");
let buttonSort = document.querySelector("div.sort button");
let section = document.querySelector("section");
let construct_div = (key, value) => {
  let todoText = key;
  let todoMonth = value.todoMonth;
  let todoDate = value.todoDate;
  let status = value.status;

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text", "alert", "alert-danger");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time", "alert", "alert-danger");
  time.innerText = todoMonth + "/" + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);
  //create check button
  let checkButton = document.createElement("button");
  checkButton.classList.add("check", "btn", "btn-outline-success");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  //check event setting
  checkButton.addEventListener("click", (e) => {
    let todo = e.target.parentElement;
    todo.classList.toggle("done");
    // console.log(todo.children[0]);
    todo.children[0].classList.toggle("alert-danger");
    todo.children[0].classList.toggle("alert-success");
    // console.log(todo.children[1]);
    todo.children[1].classList.toggle("alert-danger");
    todo.children[1].classList.toggle("alert-success");
    //remove old one
    console.log(todo.children);
    // let todoText = todo.children[0].value;
    let todoText = todo.children[0].textContent;

    localStorage.removeItem(todoText);
    //save new one
    let status = todo.classList.contains("done");
    save(todoText, todoMonth, todoDate, status);
  });
  todo.append(checkButton);

  //create trash botton
  let trashButton = document.createElement("button");
  trashButton.classList.add("trash", "btn", "btn-outline-danger");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  //trash botton event setting
  trashButton.addEventListener("click", (e) => {
    let todo = e.target.parentElement;
    todo.addEventListener("animationend", () => {
      localStorage.removeItem(todo.children[0].textContent);
      todo.remove();
    });
    todo.style.animation = "scaleDown 0.2s forwards";
  });
  todo.append(trashButton);
  todo.style = "animation: scaleUp 0.2s forwards;"; //add animation scss need setting ,too
  if (status === true) {
    todo.children[0].classList.toggle("alert-danger");
    todo.children[0].classList.toggle("alert-success");
    todo.children[1].classList.toggle("alert-danger");
    todo.children[1].classList.toggle("alert-success");
    todo.classList.toggle("done");
  }

  section.append(todo);
};
load();
if (localStorage.length > 1) {
  sort();
}
button.addEventListener("click", (e) => {
  e.preventDefault();

  //get the input value
  let divForm = e.target.parentElement.parentElement;
  console.log(divForm);
  todoText = divForm.children[0].children[0].value; //待辦事項
  todoMonth = divForm.children[1].children[0].value; //月
  todoDate = divForm.children[2].children[0].value; //日

  // check all inputs are complete
  if (todoText === "" || todoMonth === "" || todoDate === "") {
    alert("Please enter all three blocks!");
    return; //don't execute code below
  }

  //創建element到頁面下方
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text", "alert", "alert-danger");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time", "alert", "alert-danger");
  time.innerText = todoMonth + "/" + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);
  //create check button
  let checkButton = document.createElement("button");
  checkButton.classList.add("check", "btn", "btn-outline-success");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  //check event setting
  checkButton.addEventListener("click", (e) => {
    let todo = e.target.parentElement;
    todo.classList.toggle("done");
    // console.log(todo.children[0]);
    todo.children[0].classList.toggle("alert-danger");
    todo.children[0].classList.toggle("alert-success");
    // console.log(todo.children[1]);
    todo.children[1].classList.toggle("alert-danger");
    todo.children[1].classList.toggle("alert-success");

    //remove old one
    // console.log(todo.children);

    let todoText = todo.children[0].textContent;
    // console.log(todo.children[0].textContent);

    localStorage.removeItem(todoText);
    //save new one
    let status = todo.classList.contains("done");
    save(todoText, todoMonth, todoDate, status);
  });
  todo.append(checkButton);

  //create trash botton
  let trashButton = document.createElement("button");
  trashButton.classList.add("trash", "btn", "btn-outline-danger");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  //trash botton event setting
  trashButton.addEventListener("click", (e) => {
    let todo = e.target.parentElement;
    todo.addEventListener("animationend", () => {
      todo.remove();
    });
    todo.style.animation = "scaleDown 0.2s forwards";
  });
  todo.append(trashButton);
  todo.style = "animation: scaleUp 0.2s forwards;"; //add animation scss need setting ,too
  divForm.children[0].children[0].value = ""; //Clear the input
  section.append(todo);

  //store data to localStorage
  let status = todo.classList.contains("done");
  save(todoText, todoMonth, todoDate, status);
});
buttonSort.addEventListener("click", () => {
  sort();
});

// save to localStorage
function save(todoText, todoMonth, todoDate, status) {
  let key = todoText;
  let value = {
    todoMonth: todoMonth,
    todoDate: todoDate,
    status: status,
  };
  localStorage.setItem(key, JSON.stringify(value)); //新增資料
}

// load all localStorage data
function load() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    construct_div(key, value);
  }
}

//Sort

//a bigger return true; otherwise false
function objComp(a, b) {
  if (Number(a.todoMonth) > Number(b.todoMonth)) {
    return true;
  } else if (Number(a.todoMonth) === Number(b.todoMonth)) {
    if (Number(a.todoDate) > Number(b.todoDate)) {
      return true;
    }
  }
  return false;
}
//merge 2 arrays
function merge(arr1, arr2) {
  console.log(arr1, arr2);
  let arr = [];
  let i = 0; //left index
  let j = 0; //right index
  while (true) {
    if (objComp(arr1[i], arr2[j])) {
      //a is bigger,push b
      arr.push(arr2[j]);
      j++;
    } else {
      arr.push(arr1[i]);
      i++;
    }
    if (i === arr1.length || j === arr2.length) {
      break;
    }
  }
  if (i === arr1.length) {
    //a run out
    for (let k = j; k < arr2.length; k++) {
      arr.push(arr2[k]);
    }
  } else {
    for (let k = i; k < arr1.length; k++) {
      arr.push(arr1[k]);
    }
  }
  console.log(arr);
  return arr;
}

//seperate into two subarrays and then comparison & merge
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}

function sort() {
  //contruct array
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    obj = {
      todoText: key,
      todoMonth: value.todoMonth,
      todoDate: value.todoDate,
      status: value.status,
    };
    arr.push(obj);
  }

  arr = mergeSort(arr);
  console.log(arr);
  let leng = section.children.length;
  for (let i = 0; i < leng; i++) {
    // console.log(i);
    section.children[0].remove(); //index always 0, cause array will shorten itself

    // console.log(section.children);
  }
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i].todoText;
    value = {
      todoMonth: arr[i].todoMonth,
      todoDate: arr[i].todoDate,
      status: arr[i].status,
    };
    construct_div(key, value);
  }
}
