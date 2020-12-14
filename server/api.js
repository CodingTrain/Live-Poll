const database = require("./helpers/database");
const basicauth = require("./validation/basicauth");
const createNewPoll = require("./helpers/createNewPoll");
const express = require("express");
const router = express.Router();

router.post("/new", async (request, response) => {
  // request body should be in this form
  // {
  //   question: string,
  //   options:  string[]
  // }

  let { question, options } = request.body;

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


//End point to delete a poll if authenticated
router.delete('/poll/:pollId', async function(req, res) {
  //check for authentication before access
  if (!basicauth.isAuthenticated(req, res)) {
    return ;
  }

  // get poll from url
  const _id = req.params.pollId;
  const poll = await database.findOne({ _id });

  if (!poll) {
    res.status(404);
    res.json({
      status: 'error',
      message: 'Poll not found'
    })
    return;
  }

  let count = await database.remove({ _id });

  if (count == 0) {
    res.status(500);
    res.json({
      status: 'error',
      message: 'Poll not found'
    })
  } else {
    res.json({
      status: 'success',
      message: 'Poll deleted successfully'
    })
  }


});


module.exports = router;
