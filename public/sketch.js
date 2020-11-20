// TODO: create a poll creation page
// Different pages for voting, viewing, and poll creation

let poll = {};
const maxEmojis = 40;
let voteButton;
const default_poll_id = 'Xyk1rXxIbDfFA0hy';
let poll_id = undefined;

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

async function countVotes() {
	// TODO: this page should be for a specific poll
	poll_id = getPollID();
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
		poll_id = getPollID();
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