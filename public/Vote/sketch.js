// TODO create a poll creation page
// Different pages for voting, viewing, and poll creation

let votes = {};
let voteButton;
let trainEngin;
let trainPart;

function preload(){
  trainEngin = loadImage('../assets/engin.png')
  trainPart = loadImage('../assets/part.png')
}

async function countVotes() {
  // TODO this page should be for a specific poll
  const response = await fetch("votes/xGclteY1Lfu2q9DP");
  votes = await response.json();
}

function setup() {
  createCanvas(400, 100);
  background(0);
  radio = createRadio();
  radio.option('a');
  radio.option('b');
  radio.option('c');
  radio.option('d');
  radio.style('width', '50px');
  radio.position(250,125);
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
  window.location.replace('done.html');
}
