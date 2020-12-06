/* eslint-disable no-unused-vars */
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

app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


// Routes
const webRoutes = require("./web");
app.use("/", webRoutes);


const apiRoutes = require("./api");
app.use("/api", apiRoutes);
