/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Feel free to give a better name to this file
// This Javascript is powering /vote/:pollId route

let poll = {};

async function setup() {
  noCanvas();

  let res = await fetch(`/api/poll/${getPollID()}`);
  poll = await res.json();
  poll_id = poll._id;

  createP(poll.question).addClass("question");

  radio = createRadio();
  for (let i = 0; i < poll.options.length; i++) {
    radio.option(i, poll.options[i]); // First arg is index, second arg is what is visible to user
  }
  // radio.style('width', '50px'); // Change this for width of radio

  // Create the vote button
  voteButton = createButton("vote");
  // And add a class and a mouse pressed event listener
  voteButton.addClass("VoteBTN");
  voteButton.mousePressed(submitVote);
}
