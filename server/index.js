/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
require("dotenv").config();
const createNewPoll = require("./helpers/createNewPoll");

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

app.set("views", "./views");
app.set("view engine", "pug");


app.use(express.static("public"));
app.use(express.json()); // For parsing application/json
>>>>>>> upstream/main

// Routes
const webRoutes = require("./web");
app.use("/", webRoutes);


const apiRoutes = require("./api");
app.use("/api", apiRoutes);
>>>>>>> upstream/main

// const createNewPoll = require("./helpers/createNewPoll");
// createNewPoll("Your question here", ["Option A", "Option B", "Option C"]);
