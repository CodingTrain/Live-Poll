/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// TODO: create different pages for voting, viewing, and poll creation

let poll = {};
let poll_id; // Copy the _id from database.db
let voteButton;
let trainEngin;
let trainPart;
let firstRender = true;

function preload() {
  trainEngin = loadImage("assets/engine.png");
  trainPart = loadImage("assets/part.png");
}

async function setup() {
  noCanvas();
  await countVotes();
  setInterval(countVotes, 500);

  let pollQ = select(".question").html(poll.question);

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

function displayResults(poll) {
  // Select DOM elements
  let resultsDiv = select("#results");
  let noOfVotesP = select("#total-votes");

  // Get the number of votes that the most voted option has.
  let maxVotes = poll.votes.reduce((a, b) => (a > b ? a : b));

  // Get the total number of votes.
  let totalVotes = poll.votes.reduce((a, b) => a + b);
  noOfVotesP.html(`${totalVotes} votes`);

  for (const [index, option] of Object.entries(poll.options)) {
    let count = poll.votes[index];
    let width = round(map(count, 0, maxVotes, 0, 100));
    if (totalVotes == 0) width = 0;

    if (firstRender) doTheFirstRender(index, option, resultsDiv);

    // Get the progress bar element
    let progressBar = select("#progress-bar-" + index);
    // Set the width
    progressBar.style("width", width + "%");
    // Set the text
    let percent = (count / totalVotes) * 100;
    if (totalVotes == 0) percent = 0;
    progressBar.html(Math.round(percent) + "%");
  }
  firstRender = false;
}

// Feel free to rename. couldn't come up with a good name so...  - D-T-666
function doTheFirstRender(index, option, resultsDiv) {
  // Container div per option
  let optionDiv = createDiv();
  // console.log(optionDiv);
  optionDiv.addClass("option");

  // Add option text on a separate line, so it can get any length
  let optionText = createSpan(option);

  optionDiv.child(optionText);
  resultsDiv.child(optionDiv);

  // Add option progress bar
  let progressBar = createDiv();

  progressBar.id("progress-bar-" + index);
  progressBar.addClass("progressBar");
  resultsDiv.child(progressBar.elt);
}
