// TODO: create different pages for voting, viewing, and poll creation

let poll = {};
let poll_id = undefined; // Copy the _id from database.db
const default_poll_id = 'p7PqWACbsGVnSMQK';
let voteButton;
let trainEngin;
let trainPart;
let firstRender = true;

function preload() {
  trainEngin = loadImage('assets/engin.png');
  trainPart = loadImage('assets/part.png');
}

async function setup() {
  noCanvas();
  await countVotes();
  setInterval(countVotes, 500);

  let pollQ = createElement('p', poll.question);
  pollQ.addClass("question");

  radio = createRadio();
  for (let i = 0; i < poll.options.length; i++) {
    radio.option(i, poll.options[i]); // First arg is index, second arg is what is visible to user 
  }
  // radio.style('width', '50px'); // Change this for width of radio 

  // Create the vote button
  voteButton = createButton('vote');
  // And add a class and a mouse pressed event listener
  voteButton.addClass("VoteBTN");
  voteButton.mousePressed(submitVote);
}

function displayResults(poll) {
  // Create 
  let resultsDiv = document.getElementById('results');

  // Get the number of votes that the most voted option has.
  let maxVotes = poll.votes.reduce((a, b) => (a > b ? a : b));

  // Get the total number of votes.
  let totalVotes = poll.votes.reduce((a, b) => (a + b));

  for (const [index, option] of Object.entries(poll.options)) {
    let count = poll.votes[index];
    let width = map(count, 0, maxVotes, 0, 100);

    if (firstRender)
      doTheFirstRender(index, option, resultsDiv);

    // Get the progress bar element
    let progressBar = document.getElementById("progressBar_" + index);
    // Set the width
    progressBar.style.setProperty('width', width + '%');
    // Set the text
    progressBar.innerHTML = Math.round(count / totalVotes * 100) + '%';
  }
  firstRender = false;
}

const doTheFirstRender = (index, option, resultsDiv) => {
  // Container div per option
  let optionDiv = document.createElement('div');
  optionDiv.classList.add('option');

  // Add option text on a separate line, so it can get any length
  let optionText = document.createElement('span');

  optionText.innerHTML = option;
  optionDiv.append(optionText);
  resultsDiv.append(optionDiv);

  // Add option progress bar
  let progressBar = document.createElement('div');

  progressBar.id = 'progressBar_' + index;
  progressBar.classList.add('progressBar');
  resultsDiv.append(progressBar);
};
