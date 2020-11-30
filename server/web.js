const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/createPoll", function (req, res) {
  res.render("createPoll");
});

router.get("/poll/:pollId", function (req, res) {
  res.render("poll");
});

router.get("/vote/:pollId", function (req, res) {
  res.render("vote");
});

module.exports = router;
