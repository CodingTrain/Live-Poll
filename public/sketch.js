// TODO: create a poll creation page
// Different pages for voting, viewing, and poll creation

let poll = {};
let poll_id = undefined; // copy the _id from database.db
const default_poll_id = 'p7PqWACbsGVnSMQK'
const maxEmojis = 40;
let voteButton;
<<<<<<< HEAD
<<<<<<< HEAD
let trainEngin;
let trainPart;
=======
let poll_id = 'Xyk1rXxIbDfFA0hy';
>>>>>>> b2df93c... some cleanup in sketch.js

function preload(){
  trainEngin = loadImage('assets/engin.png')
  trainPart = loadImage('assets/part.png')
}

// function currently not in use
function getPollID() {
<<<<<<< HEAD
  const { pollId } = getURLParams();
  // TODO: instead of default poll add a separate page for user to input poll id?
  if (!pollId) {
		if (poll_id == undefined)
			poll_id = prompt('Poll id') || default_poll_id
		return poll_id;
	};
	return pollId;
}
=======
const default_poll_id = 'Xyk1rXxIbDfFA0hy';
>>>>>>> ca7cd40... some minor poll_id refactor

function getPollID() {
  const { pollId } = getURLParams();
  // TODO: instead of default poll add a separate page for user to input poll id?
  if(!pollId) return '1m325LWz9t1eX2fT'
  return pollId
=======
	const { pollId } = getURLParams();
	// TODO: instead of default poll add a separate page for user to input poll id?
	if (!pollId) return prompt('Poll id') || default_poll_id;
	return pollId;
>>>>>>> b2df93c... some cleanup in sketch.js
}

let firstRender = true;

async function countVotes() {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
	// TODO this page should be for a specific poll
=======
	// TODO: this page should be for a specific poll
	const poll_id = getPollID();
>>>>>>> ca7cd40... some minor poll_id refactor
	const response = await fetch(`/poll/${poll_id}`);
	poll = await response.json();
	if (poll.message) throw new Error(poll.message);
	return poll;
}

async function setup() {
	createCanvas(400, 100);
	await countVotes();
	setInterval(countVotes, 500);

	radio = createRadio();
	for (let i = 0; i < poll.options.length; i++) {
		radio.option(i, poll.options[i]); // First arg is index, second arg is what is visible to user 
	}
	// radio.style('width', '180px'); // Change this for width of radio 
	voteButton = createButton('vote');
	voteButton.mousePressed(submitVote);
}

async function submitVote() {
	let choice = radio.value(); // Choice is a number
	// TODO: select poll id somehow => URL query parameters?
	if (!isNaN(choice)) {
		const poll_id = getPollID();
		let response = await fetch(`vote/${poll_id}/${choice}`);
		let status = await response.json();
		console.log(status);
	} else {
		console.log('no choice selected');
	}
}

function draw() {
	clear();
	// background(255);

	if (poll.options) {
		let maxVotes = 0;
		// Old code:
		// for (let i = 0; i < poll.options.length; i++) {
		// 	let count = poll.votes[i];
		// 	maxVotes = max(count, maxVotes);
		// }
		// New code:
		for (let count of poll.votes)
			// For the vote count of each option do:
			maxVotes = max(count, maxVotes);

		let divisor = 1;

		while (maxVotes / divisor > maxEmojis) divisor *= 5;

		for (let i = 0; i < poll.options.length; i++) {
			// Variables Breakdown: 
			// i = index (before it was choice which was an alphabet)
			// poll.options[i] = the actual option
			// poll.votes[i]   = number of votes for this option    
			let choice = poll.options[i];
			let numEmojis = poll.votes[i] / divisor;
			let x = 10;
			let y = 20 + i * 20;

			fill(0);
			noStroke();
			text("🚂".repeat(numEmojis), x, y, 10);
			text(choice, x, y + 10);
			// Resize as per requirements.
		}
	}
}
>>>>>>> b2df93c... some cleanup in sketch.js
