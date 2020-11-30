/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */

// Function currently not in use
function getPollID() {
  const { pollId } = getURLParams();
  // TODO:  add a separate page for user to input poll id?
  if (!pollId) {
    if (poll_id == undefined) poll_id = prompt("Poll id");
    return poll_id;
  }
  return pollId;
}

function getPollID() {
  // NOTE: maybe rename this to something smaller like "id" or "ID"
  const { pollId } = getURLParams();
  // TODO:  add a separate page for user to input poll id?
  if (!pollId) return;
  return pollId;
}

async function countVotes() {
  // TODO: this page should be for a specific poll

  // Get the poll id
  poll_id = getPollID();

  let response;
  if (poll_id) {
    // Fetch the poll
    response = await fetch(`/api/poll/${poll_id}`);
  } else {
    // Use newest poll created
    response = await fetch(`/api/poll/newest`);
  }
  // Extract the json
  poll = await response.json();
  poll_id = poll._id;

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
