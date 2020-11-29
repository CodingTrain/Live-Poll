const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json()); // For parsing application/json

// Routes
const apiRoutes = require("./api");
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

const createNewPoll = require("./helpers/createNewPoll");
createNewPoll();
