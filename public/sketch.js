// TODO create a poll creation page
// Different pages for voting, viewing, and poll creation

let votes = {};
const maxEmojis = 40;
let voteButton;

async function countVotes() {
  // TODO this page should be for a specific poll
  const response = await fetch("votes/xGclteY1Lfu2q9DP");
  votes = await response.json();
}

function setup() {
  createCanvas(400, 100);
  countVotes();
  setInterval(countVotes, 500);

  radio = createRadio();
  radio.option('a');
  radio.option('b');
  radio.option('c');
  radio.option('d');
  radio.style('width', '60px');
  voteButton = createButton('vote');
  voteButton.mousePressed(submitVote);
}

async function submitVote() {
  let choice = radio.value();
  // TODO: select poll id somehow
  if (choice) {
    let response = await fetch(`vote/xGclteY1Lfu2q9DP/${choice}`);
    let status = await response.json();
    console.log(status);
  } else {
    console.log('no choice selected');
  }
}

function draw() {
  clear();
  // background(255);

  let choices = Object.keys(votes);
  // The check is no longer needed and also now it will support >4 options
  choices = choices.filter((elt) => /^[abcd]$/.test(elt));

  let maxVotes = 0;
  for (let choice of choices) {
    let count = votes[choice];
    maxVotes = max(count, maxVotes);
  }
  let divisor = 1;
  while (maxVotes / divisor > maxEmojis) {
    divisor *= 5;
  }
  
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    let numEmojis = votes[choice] / divisor;
    let x = 10;
    let y = 20 + i * 20;
    
    fill(0);
    noStroke();
    text(choice, x, y + 10);
    text("🚂".repeat(numEmojis), x, y, 10);
    //resize as per requirements.
  }
}
