/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */

function getPollID() {
  const matches = /\/poll\/([0-9a-zA-Z]+)/g.exec(location.href);

  if (!matches || matches.length !== 2) {
    throw new Error("No pollId found");
  }

  const pollId = matches[1];

  return pollId;
}

async function countVotes() {
  // Get the poll id
  pollId = getPollID();

  // Fetch the poll
  const response = await fetch(`/api/poll/${pollId}`);
  // Extract the json
  poll = await response.json();

  // Throw an error if the poll has an error message
  if (poll.message) throw new Error(poll.message);

  // After all, display the results
  displayResults(poll);
}

async function submitVote() {
  const choice = radio.value(); // Choice is a number

  // If choice is not undefined
  if (choice) {
    // Store the result of a GET request
    const response = await fetch(`/api/vote/${poll_id}/${choice}`);
    // Extract the json frome the response
    const status = await response.json();

    console.log(status);
  } else {
    console.log("no choice selected");
  }
}
