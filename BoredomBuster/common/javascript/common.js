//Variables
const navLinksDOM = document.querySelectorAll(".nav__link");
const activePage = window.location.pathname;

//Add the active class to the nav link if is the page you are viewing.
Array.from(navLinksDOM).forEach((link, index) => {
  if (link.href.includes(`${activePage}`)) {
    link.children[0].classList.add("active");
  }
});
