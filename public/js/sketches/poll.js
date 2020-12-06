/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function setup() {
  noCanvas();
  poll = new Poll();
  poll.startPollingForVotes();
}
