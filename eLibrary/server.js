const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const catchError = require("./API/middlewares/error.middleware");
require("dotenv").config({
  path: "./config/variables.env",
});
const handlebars = require("express-handlebars");

app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`,
  })
);
app.set("view engine", "hbs");
app.use(express.static("public"));

const bookRoutes = require("./API/routes/book.route");

app.get("/", (req, res) => {
  res.status(200).render("search", { layout: "index" });
});

app.use("/", bookRoutes);

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.use(catchError);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
