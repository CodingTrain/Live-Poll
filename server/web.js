const express = require("express");
const router = express.Router();
const database = require("./helpers/database");

//Index page to have an overview of active polls (and be ablo to manage them perhaps) - might need some password protection
router.get("/", function (req, res) {
  res.render("index");
});

//Page to create a new poll
router.get("/createPoll", function (req, res) {
  res.render("createPoll");
});

//Page to see the results of a poll
router.get("/poll/:pollId", async function (req, res) {
  const _id = req.params.pollId;
  const poll = await database.findOne({ _id });

  res.render("poll", { poll });
});

//Page to add a vote to a poll
router.get("/vote/:pollId", function (req, res) {
  res.render("vote");
});

module.exports = router;
