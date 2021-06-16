const express = require("express");
const router = express.Router();
const database = require("./helpers/database");
const floodChecker = require("./validation/antipollspam");
const { requiresAuthentication } = require("./validation/basicauth");

//Index page to have an overview of active polls (and be able to manage them perhaps) - might need some password protection
router.get("/", requiresAuthentication, async (req, res) => {
  res.render("index", {
    polls: await database.find({}).sort({ timestamp: -1 }),
    styling: req.query,
  });
});

//Page to create a new poll
router.get("/create", requiresAuthentication, function (req, res) {
  res.render("create", { styling: req.query });
});

//Route for getting the newest poll
router.get("/newest", async (req, res) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  if (!poll) {
    res.status(404);
    res.render("notfound", { styling: req.query });
  } else {
    res.render("poll", { poll: poll, styling: req.query });
  }
});

//Route for getting the newest poll
router.get("/vote-now", async (req, res) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  if (!poll) {
    res.status(404);
    res.render("notfound", { styling: req.query });
  } else {
    res.redirect("/vote/" + poll._id);
  }
});

//Route for getting the newest poll
router.get("/vote-now", async (req, res) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  if (!poll) {
    res.status(404);
    res.render("notfound", { styling: req.query });
  } else {
    res.redirect("/vote/" + poll._id);
  }
});

//Page to see the results of a poll
router.get("/poll/:pollId", async function (req, res) {
  const _id = req.params.pollId;
  const poll = await database.findOne({ _id });

  if (!poll) {
    res.status(404);
    res.render("notfound", { styling: req.query });
  } else {
    res.render("poll", { poll: poll, styling: req.query });
  }
});

//Page to add a vote to a poll
router.get("/vote/:pollId", async function (req, res) {
  const _id = req.params.pollId;

  let ip = req.ip;
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"];
  }

  const floodCheckId = _id + "_" + ip;
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
    res.render("vote", { poll: poll, styling: req.query });
  }
});

//Post request to do a vote
router.post("/vote/:pollId", async function (req, res) {
  const _id = req.params.pollId;

  let ip = req.ip;
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"];
  }

  const floodCheckId = _id + "_" + ip;
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
  req.app.get("broadcaster").updatePoll(poll);

  // Forward user to poll results page
  res.redirect("/poll/" + _id);
});

// Function that determines if a query parameter is 'truthy'
// Allows for everything except undefined, 'false', '0', 0, and null
function queryParameterTruthy(parameter) {
  return (
    parameter &&
    String(parameter).toLowerCase() !== "false" &&
    Number(parameter) !== 0
  );
}

//Page to view the qrcode that links to the latest poll's voting page
router.get("/qrcode/", async (req, res) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  const hostAddress = req.get("host");
  const pollURL = `http://${hostAddress}/vote/${poll._id}`;

  if (!poll) {
    res.status(404);
    res.render("notfound");
  } else if (queryParameterTruthy(req.query.results)) {
    // if results are specified, display the QRCode to vote with the results of the poll

    // in order to display default styling, we need to have an empty object
    // we remove the results key to make sure if no other params are set the object is empty
    delete req.query.results;

    res.render("qrcode-results", {
      pollURL,
      poll,
      styling: req.query,
      question: poll.question,
    });
  } else {
    // Just render the QR Code for the voting page
    res.render("qrcode", { pollURL, question: poll.question });
  }
});

module.exports = router;
