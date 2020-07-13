const burger = document.querySelector("[data-header-toggle]");
const menu = document.querySelector("[data-header-side-nav]");

burger.addEventListener("click", function () {
  menu.classList.toggle("side-nav--open");
});
