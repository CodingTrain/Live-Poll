const database = require("./helpers/database");
const createNewPoll = require("./helpers/createNewPoll");
const express = require("express");
const router = express.Router();

router.get("/vote/:pollId/:choice", async (request, response) => {
  const { pollId: _id, choice } = request.params;

  // Query the database for the requested id
  const poll = await database.findOne({ _id });

  // If there is no poll found in the database,
  // send and error response
  if (!poll) {
    return response.send({
      status: "error",
      message: "Invalid Poll ID",
    });
  }

  // If the choice is out of range from the possible options,
  // send and error response
  if (choice < 0 || choice >= poll.options.length) {
    return response.send({
      status: "error",
      message: "Invalid Choice",
    });
  }

  // Update the votes
  poll.votes[choice]++;

  // Push the update to the database
  database.update({ _id }, poll);

  // Send the response back
  response.send(poll);
}); // End of app.get("/vote/:pollId/:choice")

// TODO: make './public/create/index.html' the UI for creating polls
//       so  GET  /create will be UI for new poll
//       and POST /new    will be creating the poll
router.post("/new", async (request, response) => {
  // request body should be in this form
  // {
  //   question: string,
  //   options:  string[]
  // }

  let { question, options } = request.body;

  console.log(request.body);

  // Truthy filter (falsy values will be removed from the array)
  options = options.filter((x) => x);

  // Create a poll object, insert it in the database and get the ID back
  let pollID = await createNewPoll(question, options);

  // Send a response carryinh the poll id
  response.send({
    status: "success",
    message: "Poll created successfully!",
    id: pollID,
  });
});

// GET newest poll data
// Have to put this route before the generic one because of how express uses routes
router.get("/poll/newest", async (request, response) => {
  // Get all polls, sort descending by timestamp, get the first poll
  const poll = (await database.find({}).sort({ timestamp: -1 }))[0];

  response.send(
    poll || {
      status: "error",
      message: "Poll not found",
    }
  );
});

// GET Poll Data for specific POLL ID
router.get("/poll/:pollId", async (request, response) => {
  const _id = request.params.pollId;

  const poll = await database.findOne({ _id });

  response.send(
    poll || {
      status: "error",
      message: "Poll not found",
    }
  );
});

module.exports = router;
