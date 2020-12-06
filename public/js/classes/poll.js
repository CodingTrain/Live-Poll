/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Poll {
  constructor() {
    const matches = /\/poll\/([0-9a-zA-Z]+)/g.exec(location.href);

    if (!matches || matches.length !== 2) {
      throw new Error("No pollId found");
    }

    this.pollId = matches[1];
  }

  async startPollingForVotes() {
    this.updatePoll();
    setInterval(this.updatePoll.bind(this), 500);
  }

  async updatePoll() {
    await this.fetchPollResults();
    this.updatePollResults();
  }

  updatePollResults() {
    const pollDetails = this.getPollVotesStats();

    select("#totalVotes").html(pollDetails.totalVotes + " votes");

    for (let i = 0; i < this.pollDetails.votes.length; i++) {
      let count = this.pollDetails.votes[i];
      let width =
        pollDetails.totalVotes == 0
          ? 0
          : round(map(count, 0, pollDetails.maxVotes, 0, 100));

      // Get the progress bar element
      const progressBar = select("#progressBar_" + i);
      // Set the width
      progressBar.style("width", width + "%");
      // Set the text
      const percent =
        pollDetails.totalVotes == 0
          ? 0
          : (count / pollDetails.totalVotes) * 100;
      progressBar.html(`${count} votes (${Math.round(percent)}%)`);
    }
  }

  async fetchPollResults() {
    // Fetch the poll
    const response = await fetch(`/api/poll/${this.pollId}`);

    // Extract the json
    poll = await response.json();

    // Throw an error if the poll has an error message
    if (poll.message) {
      throw new Error(poll.message);
    }

    // After all, display the results
    this.pollDetails = poll;
  }

  getPollVotesStats() {
    // Get the number of votes that the most voted option has.
    let maxVotes = this.pollDetails.votes.reduce((a, b) => (a > b ? a : b));

    // Get the total number of votes.
    let totalVotes = this.pollDetails.votes.reduce((a, b) => a + b);

    return { maxVotes, totalVotes };
  }
}
