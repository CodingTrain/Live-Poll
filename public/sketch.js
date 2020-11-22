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
  if(!pollId) return '6pKgCWCV06Rp2rF5'
  return pollId
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
  createCanvas(400, 100);
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
}

function draw() {
  clear();
  // background(255);

  if (poll.options) {
    let maxVotes = 0;
    for (let i = 0; i < poll.options.length; i++) {
      let count = poll.votes[i];
      maxVotes = max(count, maxVotes);
    }
    let divisor = 1;
    while (maxVotes / divisor > maxEmojis) {
      divisor *= 5;
    }
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
      // text("🚂".repeat(numEmojis), x, y, 10);
      text(choice, x, y + 10);
      let lastJ;
      for (let j = 1; j <= numEmojis; j++) {
        image(trainPart, x + 16 * j,y-10);//, y, 10);
        lastJ=j;
      }
        image(trainEngin, x + 16 * (lastJ+1),y-15);
        //Resize as per requirements.
      }
  }
}