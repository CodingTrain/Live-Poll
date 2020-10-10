const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");

app.get("/vote/:pollId/:choice", async (request, response) => {
  const _id = request.params.pollId;
  const choice = request.params.choice;
  const poll = await database.findOne({ _id });
  poll[choice]++;
  await database.update({ _id }, poll);
  response.send(poll);
});

app.get("/votes/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll);
});
