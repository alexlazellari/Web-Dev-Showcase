const router = require("express").Router();
const {
  searchBook,
  saveBook,
  destroyBook,
  savedBooks,
  updateBook,
  findBook,
} = require("../controllers/book.controller");

router.route("/books").get(searchBook);

router.route("/book/:workid").get(findBook);

router.route("/saved-books").get(savedBooks);

router.route("/book").post(saveBook);

router.route("/book/:workid").put(updateBook);

router.route("/book/:workid").delete(destroyBook);

module.exports = router;
