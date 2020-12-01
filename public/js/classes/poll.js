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
    await this.initPollResults();
    setInterval(this.updatePoll.bind(this), 500);
  }

  async initPollResults() {
    await this.fetchPollResults();

    //Set title of poll
    select("#question").html(this.pollDetails.question);

    const resultsDiv = select("#results");

    //Init dom elements
    for (let i = 0; i < this.pollDetails.votes.length; i++) {
      // Container div per option
      const optionDiv = createDiv();
      optionDiv.addClass("option");

      // Add option text on a separate line, so it can get any length
      const optionText = createSpan(this.pollDetails.options[i]);

      optionDiv.child(optionText);
      resultsDiv.child(optionDiv);

      // Add option progress bar
      const progressBar = createDiv();
      progressBar.id("progress-bar-" + i);
      progressBar.addClass("progressBar");

      resultsDiv.child(progressBar.elt);
    }

    this.updatePollResults();
  }

  async updatePoll() {
    await this.fetchPollResults();
    this.updatePollResults();
  }

  updatePollResults() {
    const pollDetails = this.getPollVotesStats();

    for (let i = 0; i < this.pollDetails.votes.length; i++) {
      let count = this.pollDetails.votes[i];
      let width =
        pollDetails.totalVotes == 0
          ? 0
          : round(map(count, 0, pollDetails.maxVotes, 0, 100));

      // Get the progress bar element
      const progressBar = select("#progress-bar-" + i);
      // Set the width
      progressBar.style("width", width + "%");
      // Set the text
      const percent =
        pollDetails.totalVotes == 0
          ? 0
          : (count / pollDetails.totalVotes) * 100;
      progressBar.html(Math.round(percent) + "%");
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
