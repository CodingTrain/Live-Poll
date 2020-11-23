// TODO: create a poll creation page
// Different pages for voting, viewing, and poll creation

let poll = {};
let poll_id = undefined; // copy the _id from database.db
const default_poll_id = 'p7PqWACbsGVnSMQK'
const maxEmojis = 40;
let voteButton;
let trainEngin;
let trainPart;

function preload(){
  trainEngin = loadImage('assets/engin.png')
  trainPart = loadImage('assets/part.png')
}

// function currently not in use
function getPollID() {
  const { pollId } = getURLParams();
  // TODO: instead of default poll add a separate page for user to input poll id?
  if (!pollId) {
		if (poll_id == undefined)
			poll_id = prompt('Poll id') || default_poll_id
		return poll_id;
	};
	return pollId;
}

function getPollID() {
  const { pollId } = getURLParams();
  // TODO: instead of default poll add a separate page for user to input poll id?
  if(!pollId) return '1m325LWz9t1eX2fT'
  return pollId
}

let firstRender = true;

async function countVotes() {
  // TODO this page should be for a specific poll
  poll_id = getPollID();
  const response = await fetch(`/poll/${poll_id}`);
  poll = await response.json();
  if (poll.message) {
    throw new Error(poll.message);
  }
  displayResults(poll);
}

function displayResults(poll) {

  let resultsDiv = document.getElementById('results');

  let maxVotes = 0;
  let totalVotes = 0;
  for (let count of poll.votes) {
    maxVotes = max(count, maxVotes);
    totalVotes += count;
  }

  for(const [index, option] of Object.entries(poll.options)) {
    let count = poll.votes[index];
    let width = map(count, 0, maxVotes, 0, 100);
    if (firstRender) {
      //Container div per option
      let optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      // Add option text on a separate line, so it can get any length
      let optionText = document.createElement('span');
      optionText.innerHTML = option;
      optionDiv.append(optionText);
      resultsDiv.append(optionDiv);

      //Add option progress bar
      let progressBar = document.createElement('div');
      progressBar.id = 'progressBar_' + index;
      progressBar.classList.add('progressBar');
      progressBar.style.setProperty('width', width + '%');
      progressBar.innerHTML = Math.round(count/totalVotes*100) + '%';
      resultsDiv.append(progressBar);
    } else {
      let progressBar = document.getElementById("progressBar_" + index);
      progressBar.style.setProperty('width', width + '%');
      progressBar.innerHTML = Math.round(count/totalVotes*100) + '%';
    }
  }

  firstRender = false;
}

async function setup() {
  noCanvas();
  await countVotes();
  setInterval(countVotes, 500);

  let pollQ = createElement('p', poll.question)
  pollQ.addClass("question")

  radio = createRadio();
  for (let i = 0; i < poll.options.length; i++) {
    radio.option(i, poll.options[i]) // First arg is index, second arg is what is visible to user 
  }
  // radio.style('width', '50px'); // Change this for width of radio 
  voteButton = createButton('vote');
  voteButton.addClass("VoteBTN")
  voteButton.mousePressed(submitVote);
}

async function submitVote() {
  let choice = radio.value(); // choice is a number
  if (!isNaN(choice)) {
    let response = await fetch(`vote/${poll_id}/${choice}`);
    let status = await response.json();
    console.log(status);
  } else {
    console.log('no choice selected');
  }
