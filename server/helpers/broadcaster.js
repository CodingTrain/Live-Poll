class Broadcaster {
  constructor() {
    this.sockets = []
  }

  registerSocket(pollId, socket) {
    if(!this.sockets[pollId]) {
      this.sockets[pollId] = {};
    }

    this.sockets[pollId][socket.id] = socket;
  }

  unregisterSocket(socketId) {
    if (this.sockets) {
      for (let pollId in this.sockets) {
        if (this.sockets[pollId][socketId]) {
          delete this.sockets[pollId][socketId];
        }
      }
    }
  }

  updatePoll(poll) {
    const sockets = this.sockets[poll._id];
    if (sockets) {
      for(let socketId in sockets) {
        sockets[socketId].emit('updatePoll', poll);
      }
    }
  }
}

module.exports = new Broadcaster();
