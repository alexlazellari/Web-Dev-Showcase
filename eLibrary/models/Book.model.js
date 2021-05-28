let savedBooks = [];
let nextId = 0;

function generateId() {
  return ++nextId;
}

class Book {
  constructor(author, title, workid) {
    this._id = generateId();
    this._author = author;
    this._title = title;
    this._workid = workid;
    this._review = "";
  }
  get id() {
    return this._id;
  }
  get author() {
    return this._author;
  }
  get title() {
    return this._title;
  }
  get workid() {
    return this._workid;
  }
  get review() {
    return this._review;
  }
  set author(value) {
    this._author = value;
  }
  set title(value) {
    this._title = value;
  }
  set workid(value) {
    this._workid = value;
  }
  set review(value) {
    this._review = value;
  }
}

function build(author, title, workid) {
  return new Book(author, title, workid);
}

function save(book) {
  if (book instanceof Book) {
    let saved = savedBooks.filter(
      (savedBook) => savedBook.workid === book.workid
    );

    if (saved.length) return;
    savedBooks.push(book);

    return saved;
  }
}

function findAll() {
  let items = [...savedBooks];
  items = items.map((item) => {
    let obj = {
      title: item.title,
      author: item.author,
      workid: item.workid,
    };

    return obj;
  });
  return items;
}

function checkSavedBooks(books) {
  let nBooks = [];

  for (let k = 0; k < books.length; k++) {
    nBooks.push({ ...books[k], saved: false });
  }

  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < savedBooks.length; j++) {
      if (books[i].workid === savedBooks[j].workid) {
        nBooks[i] = { ...books[i], saved: true };
        break;
      }
    }
  }

  return nBooks;
}

function find(workid) {
  let saved = savedBooks.filter((savedBook) => savedBook.workid === workid);
  return saved;
}

function update(workid, updatedObj) {
  savedBooks.forEach((book, index) => {
    if (book.workid === workid) {
      savedBooks[index].author = updatedObj.author;
      savedBooks[index].title = updatedObj.title;
      savedBooks[index].review = updatedObj.review;
    }
  });
}

function destroy(workid) {
  savedBooks = savedBooks.filter((book) => book.workid !== workid);
}

module.exports = {
  build: build,
  save: save,
  findAll: findAll,
  find: find,
  update: update,
  destroy: destroy,
  checkSavedBooks: checkSavedBooks,
};
