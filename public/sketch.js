/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// TODO: create different pages for voting, viewing, and poll creation

let poll = {};
let poll_id = undefined;
const default_poll_id = "p7PqWACbsGVnSMQK";
let voteButton;
let trainEngin;
let trainPart;
let firstRender = true;

function preload(){
  trainEngin = loadImage('assets/engin.png')
  trainPart = loadImage('assets/part.png')
}

function getPollID() {
  const { pollId } = getURLParams();
  // TODO: instead of default poll add a separate page for user to input poll id?
  if (!pollId) {
		if (poll_id == undefined) poll_id = prompt('Poll id') || default_poll_id
		return poll_id;
	};
	return pollId;
}

async function countVotes() {
  // TODO this page should be for a specific poll
  poll_id = getPollID();
  const response = await fetch(`/poll/${poll_id}`);
  poll = await response.json();
  if (poll.message) throw new Error(poll.message)
  return poll
}

async function setup() {
  noCanvas();
  await countVotes();
  setInterval(countVotes, 500);

  let pollQ = createP(poll.question);
  pollQ.addClass("question");

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
  // Create
  let resultsDiv = select("#results");

  // Get the number of votes that the most voted option has.
  let maxVotes = poll.votes.reduce((a, b) => (a > b ? a : b));

  // Get the total number of votes.
  let totalVotes = poll.votes.reduce((a, b) => a + b);

  for (const [index, option] of Object.entries(poll.options)) {
    let count = poll.votes[index];
    let width = round(map(count, 0, maxVotes, 0, 100));

    if (firstRender) doTheFirstRender(index, option, resultsDiv);

    // Get the progress bar element
    let progressBar = select("#progress-bar-" + index);
    // Set the width
    progressBar.style("width", width + "%");
    // Set the text
    progressBar.html(Math.round((count / totalVotes) * 100) + "%");
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
