const database = require("./helpers/database");
const createNewPoll = require("./helpers/createNewPoll");
const express = require("express");
const router = express.Router();

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
