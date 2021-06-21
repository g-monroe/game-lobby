function Room (id, code, host, creator) {
    this.game = "xploding-dogs";
    this.gameId = null;
    this.id = id;
    this.code = code;
    this.host = host;
    this.status = "waitingForPlayers";
    this.pendingUsers = [];
    this.closed = false;
    this.users = [host];
    this.turn = null;
    this.turnTime = null;
    this.turnLimit = 30;
    this.creator = creator;
    this.lastUsed = Date.now();
    this.createdAt = Date.now();
    return this;
}

module.exports = Room;