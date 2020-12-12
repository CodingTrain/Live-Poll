/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function setup() {
  noCanvas();
  poll = new Poll();
  poll.startPollingForVotes();

  // from https://github.com/CodingTrain/LateNight/issues/1
  const colorPairs = [
    ['#9253a1', '#70327e'],
    ['#f063a4', '#ec015a'],
    ['#2dc5f4', '#0b6a88'],
    ['#fcee21', '#f89e4f'],
    ['#f16164', '#ec015a'],
    ['#70327e', '#9253a1'],
    ['#a42963', '#ec015a'],
    ['#0b6a88', '#2dc5f4'],
    ['#f89e4f', '#fcee21'],
    ['#ec015a', '#a42963'],
  ];

  const [first, second] = random(colorPairs);
  const degrees = random(35, 75) * (random() < 0.5 ? -1 : 1);

  const gradient = `repeating-linear-gradient(${nf(degrees, 0, 1)}deg, ${first}, ${first} 10px, ${second} 10px, ${second} 20px`;

  const root = document.documentElement;
  root.style.setProperty('--monochrome-gradient', gradient);

  if (green(color(first)) > 127 && green(color(second)) > 127) {
    root.style.setProperty('--progressbar-color', 'black');
  }
}
