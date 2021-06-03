// Variables
let savedBooks = [];
// Buttons
const btns = document.querySelectorAll("#saved");
const undoBtnsDOM = document.querySelectorAll("#undo");
const searchFilterDOM = document.querySelector("#search-filter");
// Mobile navigation variables
const burgerDOM = document.querySelector(".nav__burger");
const navListDOM = document.querySelector(".nav__list");
const navLinesDOM = document.querySelectorAll(".nav__line");
// Alert box variables
const alertDOM = document.querySelector(".alert");
const alertCloseDOM = document.querySelector(".alert__close");
const alertMessageDOM = document.querySelector(".alert__message");
const alertIconDOM = document.querySelector(".alert__icon");

// Alert box
alertCloseDOM.addEventListener("click", (e) => {
  alertDOM.classList.remove("alert--activate");
  alertDOM.classList.add("alert--deactivate");
});

// Set up movile navigation

burgerDOM.addEventListener("click", (e) => {
  navListDOM.classList.toggle("nav__list-active");
  Array.from(navLinesDOM).forEach((line) => {
    line.classList.toggle("nav__line-active");
  });
});

// Set up buttons

setURemoveBtns();
setUpUpdateBtns();

Array.from(btns).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let workid = e.target.dataset.id;
    let parent = e.target.parentElement.parentElement;
    let title = parent.querySelector(".book__title").textContent;
    let author = parent.querySelector(".book__copy").textContent;

    let book = {
      author,
      title,
      workid,
    };

    fetch("http://127.0.0.1:4000/book", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          changeIcon("fa-exclamation-circle", "fa-check-circle");
          alertIconDOM.classList.add("alert__icon--exclamation");
        } else {
          changeIcon(
            "fa-check-circle",
            "fa-exclamation-circle",
            "alert__icon--exclamation"
          );
        }

        return response.json();
      })
      .then((data) => {
        alertMessageDOM.textContent = data.message;
        alertDOM.classList.remove("alert--deactivate");
        alertDOM.classList.add("alert--activate");
      })
      .catch((error) => {
        console.error(error);
      });

    btn.classList.add("book__btn--saved");
    btn.textContent = "Saved";
    let undo = btn.nextElementSibling;
    undo.classList.remove("book__btn--hide");
  });
});

// Set up undo buttons

Array.from(undoBtnsDOM).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let workid = btn.dataset.id;

    fetch(`http://127.0.0.1:4000/book/${workid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          changeIcon("fa-exclamation-circle", "fa-check-circle");
          alertIconDOM.classList.add("alert__icon--exclamation");
        } else {
          changeIcon(
            "fa-check-circle",
            "fa-exclamation-circle",
            "alert__icon--exclamation"
          );
        }

        alertMessageDOM.textContent = "Book remove successfully.";
        alertDOM.classList.remove("alert--deactivate");
        alertDOM.classList.add("alert--activate");

        btn.classList.add("book__btn--hide");
        let savedBtn = btn.previousElementSibling;
        savedBtn.classList.remove("book__btn--saved");
        savedBtn.textContent = "Save";
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

// Set up remove buttons
function setURemoveBtns() {
  const removeBtnsDOM = document.querySelectorAll("#remove");
  Array.from(removeBtnsDOM).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let workid = btn.dataset.id;

      fetch(`http://127.0.0.1:4000/book/${workid}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            changeIcon("fa-exclamation-circle", "fa-check-circle");
            alertIconDOM.classList.add("alert__icon--exclamation");
          } else {
            changeIcon(
              "fa-check-circle",
              "fa-exclamation-circle",
              "alert__icon--exclamation"
            );
          }

          alertMessageDOM.textContent = "Book remove successfully.";
          alertDOM.classList.remove("alert--deactivate");
          alertDOM.classList.add("alert--activate");

          btn.parentElement.parentElement.remove();
          removeSavedBook(workid);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
}

// Set up update button
function setUpUpdateBtns() {
  const updateBtnDOM = document.querySelector("#update");
  if (updateBtnDOM) {
    updateBtnDOM.addEventListener("click", (e) => {
      let container = updateBtnDOM.parentElement.parentElement.parentElement;
      let workid = updateBtnDOM.dataset.id;
      let title = container.querySelector("#title").value;
      let author = container.querySelector("#author").value;
      let review = container.querySelector("#review").value;

      let updatedBook = {
        workid,
        title,
        author,
        review,
      };

      fetch(`http://127.0.0.1:4000/book/${workid}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      })
        .then((response) => {
          if (!response.ok) {
            changeIcon("fa-exclamation-circle", "fa-check-circle");
            alertIconDOM.classList.add("alert__icon--exclamation");
          } else {
            changeIcon(
              "fa-check-circle",
              "fa-exclamation-circle",
              "alert__icon--exclamation"
            );
          }
          return response.json();
        })
        .then((data) => {
          alertMessageDOM.textContent = data.message;
          alertDOM.classList.remove("alert--deactivate");
          alertDOM.classList.add("alert--activate");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

// Set up filter-search button

if (searchFilterDOM) {
  getSavedBooks();
  searchFilterDOM.addEventListener("input", (e) => {
    setTimeout(() => {
      let keyword = searchFilterDOM.value.toLowerCase().trim();
      displayBooks(keyword);
      setURemoveBtns();
      setUpUpdateBtns();
    }, 500);
  });
}

// Change icon of alert box

function changeIcon(check, exclamation, color = "none") {
  alertIconDOM.classList.add(check);
  alertIconDOM.classList.remove(exclamation);
  alertIconDOM.classList.remove(color);
}

// Get all saved books

function getSavedBooks() {
  let saved = document.querySelectorAll(".saved-book");
  savedBooks = [];
  Array.from(saved).forEach((book) => {
    let title = book.querySelector(".saved-book__title").textContent;
    let author = book.querySelector(".saved-book__copy").textContent;
    let review = book.querySelector(".review__content");
    if (review) {
      review = review.textContent;
    } else {
      review = "";
    }
    let workid = book.querySelector("#remove").dataset.id;
    savedBooks.push({
      title,
      author,
      workid,
      review,
    });
  });
}

// Display books that much with the given keyword

function displayBooks(keyword) {
  let filterBooks = savedBooks.filter((book) => {
    if (
      book.author.toLowerCase().includes(keyword) ||
      book.title.toLowerCase().includes(keyword)
    ) {
      return book;
    }
  });

  let filterList = Handlebars.compile(` 
    {{#if this}}
      {{#each this}}
        <article class="saved-book">
            <aside class="saved-book__aside">
                <figure class="saved-book__figure">
                    <i class="saved-book__icon fas fa-book-open"></i>
                </figure>
                <header class="saved-book__header">
                    <p class="saved-book__title">{{this.title}}</p>
                </header>
                <div class="saved-book__body">
                    <p class="saved-book__copy">{{this.author}}</p>
                </div>
            </aside>
            {{#if this.review}}
                <div class="saved-book__review">
                    <h4 class="review__title">Review:</h4>
                    <p class="review__content">{{this.review}}</p>
                </div>
            {{/if}}
            <footer class="saved-book__footer">
                <a id="edit" class="saved-book__btn saved-book__btn--yellow" href="/book/{{this.workid}}">Edit</a>
                <button id="remove" class="saved-book__btn saved-book__btn--red" data-id={{this.workid}}>Remove</button>
            </footer>
        </article>
      {{/each}}
    {{else}}
      <div class="nempty">
          <h1 style="text-align: center;" class="empty__title">No available saved books with this name.</h1>
      </div>
    {{/if}}`);
  let filled = filterList(filterBooks);
  console.log(filterList(filterBooks));
  console.log(filterBooks);

  let saved_books = document.querySelector(".saved-books");
  saved_books.innerHTML = filled;
}

// Remove saved book

function removeSavedBook(workid) {
  savedBooks = savedBooks.filter((book) => book.workid !== workid);
}
