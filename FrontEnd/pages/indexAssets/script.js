// Data
const quotes = [
  {
    quote:
      "If you're already a front-end developer, well, pretend you're also wearing a pirate hat.",
    quotee: "Ethan Marcotte, Responsive Web Design",
    cite: "https://www.goodreads.com/quotes/tag/web-development",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    quotee: "Linus Torvalds",
    cite: "https://www.goodreads.com/quotes/tag/web-development",
  },
  {
    quote: "Website without visitors is like a ship lost in the horizon.",
    quotee: "Dr. Christopher Dayagdag",
    cite: "https://www.goodreads.com/quotes/tag/web-development",
  },
  {
    quote: "Code is read more than it is written.",
    quotee: "Daniel Roy Greenfeld, Audrey Roy Greenfeld",
    cite: "https://www.goodreads.com/quotes/tag/web-development",
  },
  {
    quote: "It’s not a bug. It’s an undocumented feature!",
    quotee: "Anonymous",
    cite:
      "https://medium.com/coding-at-dawn/46-encouraging-quotes-for-web-developers-21f3e68a9fdd",
  },
  {
    quote: "If you think math is hard, try web design.",
    quotee: "Trish Parr",
    cite:
      "https://medium.com/coding-at-dawn/46-encouraging-quotes-for-web-developers-21f3e68a9fdd",
  },
  {
    quote:
      "What separates design from art is that design is meant to be… functional.",
    quotee: "Cameron Moll",
    cite:
      "https://medium.com/coding-at-dawn/46-encouraging-quotes-for-web-developers-21f3e68a9fdd",
  },
];

// Variables
const quoteDOM = document.querySelector(".main__quote");
const quoteeDOM = document.querySelector(".main__quotee");
const quoteBtn = document.querySelector(".main__quote-btn");

let day = new Date().getDay();

updateQuote(day);

quoteBtn.addEventListener("click", () => {
  let rdnNbr = Math.floor(Math.random() * 7);
  updateQuote(rdnNbr);
});

function updateQuote(number) {
  quoteDOM.textContent = quotes[number].quote;
  quoteDOM.setAttribute("cite", quotes[number].cite);
  quoteeDOM.textContent = "― " + quotes[number].quotee;
}
