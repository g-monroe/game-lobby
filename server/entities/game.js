function Game (type, room) {
    this.type = type;
    this.room = room;
    this.users = room.users;
    this.code = room.code;
    this.host = room.host;
    this.turn = room.host;
    this.playersNeeded = room.users;
    this.waitingForPlayers = true;
    this.paused = false;
    this.status = "intro";
    this.active = true;
    this.lastUsed = Date.now();
    return this;
}

module.exports = Game;