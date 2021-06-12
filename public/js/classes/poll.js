/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Poll {
  constructor() {
    const pollId = document.querySelector("[data-id]").dataset.id;

    this.pollId = pollId;

    this.socket = io({ pollId: this.pollId });

    this.socket.on(
      "connect",
      function () {
        this.socket.emit("listenForPoll", this.pollId);
      }.bind(this)
    );

    this.socket.on("updatePoll", this.updatePollResults.bind(this));
  }

  async initPoll() {
    await this.fetchPollResults();
    this.updatePollResults();
  }

  updatePollResults(poll) {
    if (poll) {
      this.pollDetails = poll;
    }
    const pollDetails = this.getPollVotesStats();

    const totalText =
      pollDetails.totalVotes == 1
        ? `${pollDetails.totalVotes} vote`
        : `${pollDetails.totalVotes} votes`;
    select("#totalVotes").html(totalText);

    // find leading element
    const leadingIndex = this.indexOfMax(this.pollDetails.votes);

    // checks if it's a tie
    const tie =
      this.pollDetails.votes.filter(
        (value) => value == this.pollDetails.votes[leadingIndex]
      ).length != 1;

    for (let i = 0; i < this.pollDetails.votes.length; i++) {
      let count = this.pollDetails.votes[i];

      // calculate percentage values
      const percent =
        pollDetails.totalVotes == 0
          ? 0
          : (count / pollDetails.totalVotes) * 100;

      // Get the progress bar element
      // Set the width by percentage
      const progressBar = select("#progressBar_" + i);
      progressBar.style("width", percent + "%");

      const voteText = count == 1 ? `${count} vote` : `${count} votes`;

      if (count > 0) {
        progressBar.html(`<p>${voteText} (${Math.round(percent)}%)</p>`);
      } else {
        progressBar.html(`<p>${voteText}</p>`);
      }

      if (!tie && i == leadingIndex) {
        progressBar.addClass("leading");
      } else {
        progressBar.removeClass("leading");
      }
    }
  }

  indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return maxIndex;
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
