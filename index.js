const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static("public"));

// For parsing JSON in POST requests
app.use(express.json())


const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");
// createNewPoll();

app.get("/vote/:pollId/:choice", async (request, response) => {
  const _id = request.params.pollId;
  const choice = request.params.choice; // choice will be a number since votes is an array (a => 0, b => 1, etc)
  const poll = await database.findOne({ _id });

  if (!poll) return response.send({ status: "error", message: "Invalid Poll ID" })
  if (choice < 0 || choice > poll.votes.length)
    return response.send({ status: "error", message: "Invalid Choice" })

  poll.votes[choice]++;
  await database.update({ _id }, poll);

  const { _id: ID, ...votes } = poll; // This creates a new object 'votes' which doesn't have the _id property
  response.send(votes);
});

// route changed to avoid confusion from voting route
app.get("/poll/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll || {
    status: "error",
    message: "Invalid Poll ID"
  });
});

// the poll creation interface will be at GET /create
app.post("/create", async (request, response) => {
  let poll = request.body;
  if (poll.question && poll.options && poll.votes) {
    const { _id } = await database.insert(poll)
    response.send({
      status: "success",
      id: _id
    })
  } else {
    response.send({
      status: "error",
      message: "Invalid structure"
    })
  }
});