const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);

app.use(express.static("public"));

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");
// createNewPoll();

app.get("/vote/:pollId/:choice", async (request, response) => {
  const { pollId: _id, choice } = request.params;
  const poll = await database.findOne({ _id });

  if (!poll) return response.send({ status: "error", message: "Invalid Poll ID" })
  if (!Object.keys(poll).filter(val => val !== "_id").includes(choice))
    return response.send({ status: "error", message: "Invalid Choice" })

  const { _id: ID, ...votes } = await database.update(
        { _id },
        { $inc: { [choice]: 1 } },
        { returnUpdatedDocs: true }
    );  // This creates a new object 'votes' which doesn't have the _id property
  response.send(votes);
});

app.get("/votes/:pollId", async (request, response) => {
    const { pollId: _id } = request.params;
    const poll = await database.findOne({ _id });
    response.send(poll);
});


function createNewPoll() {
  database.insert({ a: 0, b: 0, c: 0, d: 0 });
}