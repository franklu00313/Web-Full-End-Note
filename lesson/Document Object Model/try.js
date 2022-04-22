let arr = [1, 2, 3, 4, 5];
sessionStorage.setItem("arr", arr);
sessionStorage.setItem("arr_json", JSON.stringify(arr));
console.log(sessionStorage.getItem("arr")); //1,2,3,4,5
console.log(JSON.parse(sessionStorage.getItem("arr_json")));
//Array(5) [ 1, 2, 3, 4, 5 ]
