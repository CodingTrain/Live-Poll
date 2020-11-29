// TODO: Move into a separate file which interacts with the database

const database = require("./database");

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

module.exports = createNewPoll;
