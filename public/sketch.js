// TODO create a poll creation page
// Different pages for voting, viewing, and poll creation

let poll = {};
let voteButton;

async function countVotes() {
  // TODO this page should be for a specific poll
  const response = await fetch("/poll/U3qjK9DpPTwwguHg");
  poll = await response.json();
  return poll
}

async function setup() {
  createCanvas(400, 100);
  await countVotes();
  setInterval(countVotes, 500);

  radio = createRadio();
  for (let i = 0; i < poll.options.length; i++) {
    radio.option(i, poll.options[i]) // first arg is index, second arg is what is visible to user 
  }
  radio.style('width', '100px'); // change this for width of radio 
  voteButton = createButton('vote');
  voteButton.mousePressed(submitVote);
}

async function submitVote() {
  let choice = radio.value(); // choice is a number
  // TODO: select poll id somehow => URL query parameters?
  if (!isNaN(choice)) {
    let response = await fetch(`vote/U3qjK9DpPTwwguHg/${choice}`);
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

    for (let i = 0; i < poll.options.length; i++) {

      // Variables Breakdown: 
      // i = index (before it was choice which was an alphabet)
      // poll.options[i] = the actual option
      // poll.votes[i]   = number of votes for this option

      let w = map(poll.votes[i], 0, maxVotes, 0, 220);
      let x = 10;
      let y = 20 + i * 20;
      fill(0);
      noStroke();
      textAlign(RIGHT)
      // text(poll.options[i], x, y + 10)
      text(i, x, y + 10); // to show option as alphabet, change i to String.fromCharCode(i+97)
      textAlign(LEFT)
      for (let j = 1; j <= floor(w / 10); j++) text("🚂", x + 16 * j, y, 10);
      //resize as per requirements.
    }
  }
}