/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
require("dotenv").config();
const apiRoutes = require("./api");
const createNewPoll = require("./helpers/createNewPoll");

app.use(express.static("public"));
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

// Uncomment for creating poll
// createNewPoll("Your Question Here", ["Option A", "Option B", "Option C"]);
