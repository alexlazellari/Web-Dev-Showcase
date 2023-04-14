// Variables
const burger = document.querySelector(".nav__burger");
const navLine = document.querySelector(".nav__line");
const navList = document.querySelector(".nav__list");

burger.addEventListener("click", (e) => {
  if (!navList.classList.contains("nav__link-active")) {
    navList.classList.add("nav__link-active");
    navList.style.height = 13 + "rem";
    return;
  }
  navList.classList.remove("nav__link-active");
  navList.style.height = 0 + "rem";
});
