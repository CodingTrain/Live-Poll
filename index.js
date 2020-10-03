const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static("public"));

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");

app.get("/vote/:pollId/:choice", async (request, response) => {
  const _id = request.params.pollId;
  const choice = request.params.choice;
  const poll = await database.findOne({ _id });

  if (!poll) return response.send({ status: "error", message: "Invalid Poll ID" })
  if (!Object.keys(poll).filter(val => val !== "_id").includes(choice))
    return response.send({ status: "error", message: "Invalid Choice" })

  poll[choice]++;
  await database.update({ _id }, poll);
  delete poll._id // is this a bad idea?
  response.send(poll);
});

app.get("/votes/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll);
});


function createNewPoll() {
  database.insert({ a: 0, b: 0, c: 0, d: 0 });
}