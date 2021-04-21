const facts = [
  {
    fact:
      "The first version of HTML was written by Tim Berners-Lee in 1993. Since then, there have been many different versions of HTML. The most widely used version throughout the 2000's was HTML 4.01, which became an official standard in December 1999.",
  },
  {
    fact:
      "Cascading Style Sheet (CSS), is behind almost everything seen when a website is visited. While HTML is responsible for the content a website possesses, CSS is what visually stylizes the content and website.",
  },
  {
    fact:
      "In September 1995, a Netscape programmer named Brandan Eich developed a new scripting language in just 10 days. It was originally named Mocha, but quickly became known as LiveScript and, later, JavaScript.",
  },
];

//Variables
const factBtn = document.querySelector(".fact__btn");
const factCopy = document.querySelector(".fact__copy");

factBtn.addEventListener("click", () => {
  let random = Math.floor(Math.random() * facts.length);
  factCopy.innerHTML = facts[random].fact;
});
