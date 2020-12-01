/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */

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
