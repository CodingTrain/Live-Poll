const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json()); // For parsing application/json

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/poll/:pollId", function (req, res) {
  res.render("poll");
});

// createNewPoll();

app.get("/vote/:pollId/:choice", async (req, res) => {
  const { pollId: _id, choice } = req.params;

  // Query the database for the requested id
  const poll = await database.findOne({ _id });

  // If there is no poll found in the database,
  // send and error response
  if (!poll) {
    return res.send({
      status: "error",
      message: "Invalid Poll ID",
    });
  }

  // If the choice is out of range from the possible options,
  // send and error response
  if (choice < 0 || choice >= poll.options.length) {
    return res.send({
      status: "error",
      message: "Invalid Choice",
    });
  }

  // Update the votes
  poll.votes[choice]++;

  // Push the update to the database
  database.update({ _id }, poll);

  // Send the response back
  res.send(poll);
}); // End of app.get("/vote/:pollId/:choice")

// Changed name to avoid confusion
app.get("/votes/:pollId", async (req, res) => {
  const _id = req.params.pollId;

  const poll = await database.findOne({ _id });

  res.send(
    poll || {
      status: "error",
      message: "Poll not found",
    }
  );
});

// TODO: make './public/create/index.html' the UI for creating polls
//       so  GET  /create will be UI for new poll
//       and POST /new    will be creating the poll
app.post("/new", async (req, res) => {
  // request body should be in this form
  // {
  //   question: string,
  //   options:  string[]
  // }

  let { question, options } = req.body;

  console.log(req.body);

  // Truthy filter (falsy values will be removed from the array)
  options = options.filter((x) => x);

  // Create a poll object, insert it in the database and get the ID back
  let pollID = await createNewPoll(question, options);

  // Send a response carryinh the poll id
  res.send({
    status: "success",
    message: "Poll created successfully!",
    id: pollID,
  });
});

async function createNewPoll(question, options) {
  // Poll structure (in database):
  // {
  //   question: string,
  //   options:  string[],
  //   votes:    number[]
  // }

  // If no values passed then we put default values
  let { _id } = await database.insert({
    question: question || "What should we do now?",
    options: options || [
      "Live Poll 📄",
      "Community Contributions 🎡",
      "Bots 🤖",
    ],
    votes: new Array(options ? options.length : 3).fill(0),
  });
  return _id;
}
