const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
app.use(express.static("public"));
app.use(express.json())

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");
// createNewPoll();

app.get("/vote/:pollId/:choice", async (request, response) => {
  const _id = request.params.pollId;
  const choice = request.params.choice; // choice is a number (index)
  const poll = await database.findOne({ _id });

  if (!poll) return response.send({ status: "error", message: "Invalid Poll ID" })
  if (choice < 0 || choice >= poll.options.length)
    return response.send({ status: "error", message: "Invalid Choice" })

  poll.votes[choice]++;
  await database.update({ _id }, poll);

  response.send(poll);
});

// Changed name to avoid confusion
app.get("/poll/:pollId", async (request, response) => {
  const _id = request.params.pollId;
  const poll = await database.findOne({ _id });
  response.send(poll || {
    status: "error", message: "Poll not found"
  });
});

// TODO: make './public/create/index.html' the UI for creating polls
// so  GET  /create will be UI
// and POST /create will be creating the poll
app.post("/create", async (request, response) => {
  /*
    request body should be in this form
    {
      question: string,
      options: string[]
    }
  */
  let { question, options } = request.body;
  console.log(request.body)
  options = options.filter(x => x) // Truthy filter (falsy values will be removed from the array)
  let pollID = await createNewPoll(question, options)
  response.send({
    status: "success",
    message: "Poll created successfully!",
    id: pollID
  })
})


async function createNewPoll(question, options) {
  /*
  poll structure (in database): 
  {
    question: string,
    options: string[],
    votes: number[]
  }
   */
  // if no values passed then we put default values
  let { _id } = await database.insert({
    question: question || "What should we do now?",
    options: options || ["Live Poll 📄", "Everyday Calendar 📅"],
    votes: new Array(options ? options.length : 2).fill(0)
  });
  return _id
}