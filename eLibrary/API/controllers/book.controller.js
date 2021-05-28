const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const ErrorHandler = require("../../utils/ErrorHandler");
const Book = require("../../models/Book.model");
const fetch = require("node-fetch");

// Search a book => /books?search=keyword

module.exports.searchBook = catchAsyncError(async (req, res, next) => {
  const { keyword } = req.query;

  if (!keyword) return next(new ErrorHandler("Book title is missing.", 400));

  const data = await fetch(
    `https://reststop.randomhouse.com/resources/works?search=${keyword}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  let works = await data.json();

  let savedBooks = Book.checkSavedBooks(works.work || []);

  res.status(200).render("books", { layout: "index", works: savedBooks });
});

// Get a book by workid => /book/:id

module.exports.findBook = catchAsyncError(async (req, res, next) => {
  let { workid } = req.params;

  if (!workid) return next(new ErrorHandler("Missing Information."));

  let book = Book.find(workid);

  let obj = {
    author: book[0].author,
    title: book[0].title,
    workid: book[0].workid,
    review: book[0].review,
  };

  res.status(200).render("editBook", { layout: "index", book: obj });
});

// Get all saved books => /saved-books

module.exports.savedBooks = catchAsyncError(async (req, res, next) => {
  let savedBooks = Book.findAll();

  res.status(200).render("savedBooks", { layout: "index", works: savedBooks });
});

// Save a book => /book

module.exports.saveBook = catchAsyncError(async (req, res, next) => {
  const { author, title, workid } = req.body;

  if (!author || !title || !workid)
    return next(new ErrorHandler("Missing information.", 400));

  let book = Book.find(workid);

  if (book.length) return next(new ErrorHandler("Book already saved.", 409));

  book = Book.build(author, title, workid);
  Book.save(book);

  res.status(201).json({
    success: true,
    message: "Save completed successfully.",
  });
});

// Update a book by workid => /book/:id

module.exports.updateBook = catchAsyncError(async (req, res, next) => {
  const { author, title, review, workid } = req.body;

  if (!author || !title || !review || !workid)
    return next(new ErrorHandler("Missing information.", 400));

  Book.update(workid, { author, title, review });

  res.status(200).json({
    success: true,
    message: "Book updated successfully.",
  });
});

// Delete a book by workid => /book/:id

module.exports.destroyBook = catchAsyncError(async (req, res, next) => {
  const { workid } = req.params;

  if (!workid) {
    return next(new ErrorHandler("Missing information.", 400));
  }

  let book = Book.find(workid);

  if (!book) return next(new ErrorHandler("Book not found.", 404));

  Book.destroy(workid);

  res.status(204).json();
});
