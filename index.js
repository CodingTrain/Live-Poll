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
  const choice = request.params.choice;
  const poll = await database.findOne({ _id });

  if (!poll) return response.send({ status: "error", message: "Invalid Poll ID" })
  if (!Object.keys(poll).filter(val => val !== "_id").includes(choice))
    return response.send({ status: "error", message: "Invalid Choice" })

  poll[choice]++;
  await database.update({ _id }, poll);

  const { _id: ID, ...votes } = poll; // This creates a new object 'votes' which doesn't have the _id property
  response.send(votes);
});

app.get("/votes/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll);
});

// the poll creation interface will be at GET /create
app.post("/create", async (request, response) => {
  let poll = request.body;
  const { _id } = await database.insert(poll)
  response.send({
    status: "success",
    id: _id
  })
});