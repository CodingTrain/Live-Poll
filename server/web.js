const express = require("express");
const router = express.Router();
const database = require("./helpers/database");
const floodChecker = require("./validation/antipollspam");
const basicauth = require("./validation/basicauth");

//Index page to have an overview of active polls (and be able to manage them perhaps) - might need some password protection
router.get("/", async (req, res) => {
  if (!basicauth.isAuthenticated(req, res)) {
    return;
  }

  res.render("index", {
    polls: await database.find({}).sort({ timestamp: -1 }),
  });
});

//Page to create a new poll
router.get("/create", function (req, res) {
  if (!basicauth.isAuthenticated(req, res)) {
    return;
  }
  res.render("create");
});

//Route for getting the newest poll
router.get("/newest", async (req, res) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  if (!poll) {
    res.status(404);
    res.render("notfound");
  } else {
    res.redirect("/poll/" + poll._id);
  }
});

//Page to see the results of a poll
router.get("/poll/:pollId", async function (req, res) {
  const _id = req.params.pollId;
  const poll = await database.findOne({ _id });

  if (!poll) {
    res.status(404);
    res.render("notfound");
  } else {
    res.render("poll", { poll });
  }
});

//Page to add a vote to a poll
router.get("/vote/:pollId", async function (req, res) {
  const _id = req.params.pollId;


  const floodCheckId = _id + "_" + req.ip;
  const hasVoted = !floodChecker.check(floodCheckId);

  // uncomment this to disable this check
  // const hasVoted = false
  
  //Forward user to poll results page if already voted
  if (hasVoted) {
    res.redirect("/poll/" + _id);
    return;
  }

  const poll = await database.findOne({ _id });

  if (!poll) {
    res.status(404);
    res.render("notfound");
  } else {
    res.render("vote", { poll });
  }
});

//Post request to do a vote
router.post("/vote/:pollId", async function (req, res) {
  const _id = req.params.pollId;

  const floodCheckId = _id + "_" + req.ip;
  const isValidVote = floodChecker.checkAndRegister(floodCheckId);

  // uncomment this to disable this check
  // const isValidVote = true
  
  //Forward user to poll results page if already voted
  if (!isValidVote) {
    res.redirect("/poll/" + _id);
    return;
  }

  const poll = await database.findOne({ _id });

  if (!poll) {
    res.status(404);
    res.render("notfound");
    return;
  }

  const choice = req.body.vote;
  // If the choice is out of range from the possible options,
  // send and error response
  if (choice < 0 || choice >= poll.options.length) {
    res.status(404);
    res.render("notfound");
    return;
  }

  // Update the votes
  poll.votes[choice]++;

  // Push the update to the database
  database.update({ _id }, poll);

  //Push update to all connected clients
  global.broadcaster.updatePoll(poll);

  // Forward user to poll results page
  res.redirect("/poll/" + _id);
});

module.exports = router;
