const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json()); // For parsing application/json

// Routes
const apiRoutes = require("./api");
app.use("/api", apiRoutes);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/poll/:pollId", function (req, res) {
  res.render("poll");
});

// const createNewPoll = require("./helpers/createNewPoll");
// createNewPoll();
