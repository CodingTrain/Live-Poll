// TODO create a poll creation page
// Different pages for voting, viewing, and poll creation

let votes = {};
let voteButton;

let firstRender = true;

async function countVotes() {
  // TODO this page should be for a specific poll
  const response = await fetch("votes/xGclteY1Lfu2q9DP");
  votes = await response.json();
  displayResults(votes);
}

function displayResults(votes) {

  let resultsDiv = document.getElementById('results');

  let maxVotes = 0;
  let totalVotes = 0;
  for (let option of Object.keys(votes)) {
    let count = votes[option];
    maxVotes = max(count, maxVotes);
    totalVotes += count;
  }

  let index = 0;
  for(const [option, count] of Object.entries(votes)) {
    let width = map(count, 0, maxVotes, 0, 100);
    if (firstRender) {
      //Container div per option
      let optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      // Add option text on a seperate line, so it can get any length
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
    index++;
  }

  firstRender = false;
}

function setup() {
  noCanvas();
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
