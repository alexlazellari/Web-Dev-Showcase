const facts = [
  {
    fact:
      "Prior to its release, a Google employee by the name of Miško Hevery, was developing a side project. This side project was to help make building web applications easier for a couple internal projects he was working on. This side project later became known as AngularJS (Angular because of the <> in HTML)",
  },
  {
    fact:
      'React was created by Jordan Walke, a software engineer at Facebook, who released an early prototype of React called "FaxJS". He was influenced by XHP, an HTML component library for PHP. It was first deployed on Facebook\'s News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013.',
  },
  {
    fact:
      'Vue was created by Evan You after working for Google using AngularJS in a number of projects. He later summed up his thought process: "I figured, what if I could just extract the part that I really liked about Angular and build something really lightweight."',
  },
];

//Variables
const factBtn = document.querySelector(".fact__btn");
const factCopy = document.querySelector(".fact__copy");

factBtn.addEventListener("click", () => {
  let random = Math.floor(Math.random() * facts.length);
  factCopy.innerHTML = facts[random].fact;
});
