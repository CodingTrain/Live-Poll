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
  countVotes();
  setInterval(countVotes, 500);
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

    for (let i = 0; i < choices.length; i++) {
    choice=choices[i];
    text(choice + ` (${votes[choice]})`,50*i+30,10)
  }

  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    let w = map(votes[choice], 0, maxVotes, 0, 220);
    let x = 10;
    let y = 20 + i * 20;
    fill(0);
    noStroke();
    text(choice, x, y + 10);
    let lastJ;
    for (let j = 1; j <= floor(w / 10); j++)
    {
      image(trainPart, x + 16 * j,y-10);//, y, 10);
      lastJ=j;
    }
      image(trainEngin, x + 16 * (lastJ+1),y-15);
      //resize as per requirements.
  }
}
