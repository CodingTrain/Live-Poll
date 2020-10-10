const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json());

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");

app.post("/vote", async (request, response) => {
  const _id = request.body.pollId;
  const choice = request.body.choice;
  const poll = await database.findOne({ _id });
  poll[choice]++;
  await database.update({ _id }, poll);
  response.json(poll);
});

app.get("/votes/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll);
});
