/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// TODO: create different pages for voting, viewing, and poll creation

let poll = {};
let voteButton;
let firstRender = true;

async function setup() {
  noCanvas();
  poll = new Poll();
  poll.startPollingForVotes();

  // radio = createRadio();
  // for (let i = 0; i < poll.options.length; i++) {
  //   radio.option(i, poll.options[i]); // First arg is index, second arg is what is visible to user
  // }
  // radio.style('width', '50px'); // Change this for width of radio

  // Create the vote button
  // voteButton = createButton("vote");
  // And add a class and a mouse pressed event listener
  // voteButton.addClass("VoteBTN");
  // voteButton.mousePressed(submitVote);
}
