function User (username, token, userAgent, ip, device) {
    this.username = username;
    this.token = token;
    this.userAgent = userAgent;
    this.ip = ip;
    this.locked = 1;
    this.status = "avatarselector";
    this.room = "none";
    this.pack = "";
    this.avatar = "";
    this.joinCode = "";
    this.device = device;
    this.lastAlive = Date.now();
    return this;
}

module.exports = User;