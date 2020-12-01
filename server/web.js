const express = require("express");
const router = express.Router();
const db = require("./helpers/database");

//Index page to have an overview of active polls (and be able to manage them perhaps) - might need some password protection
router.get("/", async (req, res) => {
  res.render("index", { polls: await db.find({}).sort({ timestamp: -1 }) });
});

//Page to create a new poll
router.get("/createPoll", (req, res) => {
  res.render("createPoll");
});

//Page to see the results of a poll
router.get("/poll/:pollId", (req, res) => {
  res.render("poll");
});

//Page to add a vote to a poll
router.get("/vote/:pollId", (req, res) => {
  res.render("vote");
});

module.exports = router;
