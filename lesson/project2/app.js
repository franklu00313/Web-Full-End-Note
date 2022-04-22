let header = document.querySelector("header");
let headAnchor = document.querySelectorAll("header ul li a.list");
// console.log(header);
addEventListener("scroll", () => {
  if (window.pageYOffset != 0) {
    header.style = "background-color:#5F4633;opacity:0.98;color:white;";
    headAnchor.forEach((n) => {
      n.style = "color:white;";
    });
  } else {
    header.style = "";
    headAnchor.forEach((n) => {
      n.style = "";
    });
  }
});
