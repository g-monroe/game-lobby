const httpServer = require("http").createServer();
const config = require("./config");
const User = require("./entities/user");
const Room = require("./entities/Room");
var Tokens = require("csrf");
var uuid = require('uuid');
const fetch = require("isomorphic-fetch");
var tokens = new Tokens();
const params = {
  transports: [
    "websocket",
    "flashsocket",
    "htmlpage",
    "xhr-polling",
    "jsonp-polling",
  ],
  pingIntervals: 5000,
  cors: {
    origin: "http://localhost:3000",
  },
};
const io = require("socket.io")(httpServer, params);
const users = [];
const rooms = [];
var secret = tokens.secretSync();
io.on("connection", (socket) => {
  if (config.bannedIps.includes(socket.handshake.address)) {
    //banned ip
    socket.emit("banned");
    socket.disconnect();
    return;
  }
  socket.on("ping", function () {
    socket.emit("pong");
  });

  //#################################
  // Setup User
  //################################
  socket.on("beforejoin", function () {
    var token = tokens.create(secret);

    console.log("New User started login: " + token);
    socket.emit("csrf-token", token);
  });
  socket.on("join", function (session) {
    if (users.length > 500) {
      socket.emit("exception", { errorMessage: "server limit met" });
      return;
    }
    if (session !== undefined) {
      if (session.token !== undefined && session.username !== undefined) {
        if (!tokens.verify(secret, session.token)) {
          socket.emit("exception", { errorMessage: "csrf triggered" });
          return;
        }
        if (
          config.badwords.includes(session.username) ||
          session.username.length > 18 ||
          session.username.length < 2
        ) {
          socket.emit("exception", { errorMessage: "username is bad" });
          return;
        }
      }
    }
    var newUser = new User(
      session.username,
      session.token,
      socket.request.headers["user-agent"],
      socket.handshake.address
    );
    for (i = 0; i < users.length; i++) {
      if (users[i].username == newUser.username) {
        socket.emit("exception", { errorMessage: "username already taken" });
        return;
      }
    }
    const response_key = session.gToken;
    const secret_key = "6LcTzDobAAAAAEaBoin1NHaFbtIG7RQo3QWYLrg7";
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    fetch(url, {
      method: "post",
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success != true) {
          socket.emit("exception", { errorMessage: "google recaptcha failed" });
          return;
        }
      })
      .catch((error) => {
        socket.emit("exception", { errorMessage: "google recaptcha error" });
        return;
      });
    console.log(users.length);
    console.log(
      "New User Connected: ",
      new User(
        session.username,
        session.token,
        socket.request.headers["user-agent"],
        socket.handshake.address,
        session.device
      )
    );
    users.push(newUser);
    socket.emit("joined", newUser);
  });

  socket.on("avatarPicked", function (data) {
    try {
      //pre checks
      if (
        !config.avatarPacks.includes(data.avatar.pack) ||
        !config.avatars.includes(data.avatar.name)
      ) {
        socket.emit("exception", { errorMessage: "bad avatar" });
        return;
      }
      if (data === undefined || data.session.token === undefined) {
        socket.emit("exception", { errorMessage: "session lost" });
        return;
      }
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      me.avatar = data.avatar.name;
      me.pack = data.avatar.pack;
      me.locked = 0;
      me.status = "idle";
      me.lastAlive = Date.now();
      socket.emit("avatarSaved", me);
    } catch (error) {
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
  });

  //#################################
  // Joining Game
  //################################
  socket.on('hostGame', function(data){
    if (rooms.length > 100){
      socket.emit("exception", { errorMessage: "server game limit met" });
      return;
    }
    var id = uuid.v4();
    var code = Math.random().toString(36).substring(7);
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      me.status = "hosting";
      var newRoom = new Room(id, code, me, me);
      rooms.push(newRoom);
      socket.join(newRoom.id);
      socket.emit("hostCreated", {session: me, room: newRoom});
    } catch (error) {
      console.log(error);
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
  socket.on('findGame', function(data){
    if (rooms.length > 100){
      socket.emit("exception", { errorMessage: "server game limit met" });
      return;
    }
    var gameCode = data.gameCode;
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      console.log('-----------------------');
     console.log(data, data.gameCode, rooms);
      var game =rooms.find((room) => room.closed == false && room.status == "waitingForPlayers" && room.code == gameCode);
      if (game === undefined){
        socket.emit("exception", { errorMessage: "game not found" });
        return;
      }
      me.status = "asking" + gameCode;
      me.lastAlive = Date.now();
      game.pendingUsers.push(me);
      socket.join(me.status + me.username);
      socket.to(game.id).emit("askingHost", {username: me.username, action: "asking" + gameCode, timeRequested: Date.now()});
      socket.emit("askingToJoin", {session: me, room: "wait", timeRequested: Date.now()});
    } catch (error) {
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
  socket.on('joinTimeOut', function(data){
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      me.status = "idle";
      me.lastAlive = Date.now();
      var game = rooms.find(room => room.pendingUsers.find(user => user.username === me.username))
      game.pendingUsers.pop(me);
      socket.emit("failedJoin", {session: me});
    } catch (error) {
      console.log(error);
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
  socket.on('acceptJoin', function(data){
    var gameId = data.gameId;
    var gameCode = data.gameCode;
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      var attendee = users.find(
        (user) =>
          user.username == data.attendee &&
          user.status == "asking" + gameCode
      );
      if (attendee === undefined){
        socket.emit("exception", { errorMessage: "user not found" });
        return;
      }
      console.log('-----------------------');
      console.log(data, gameId);
      var game =rooms.find((room) => room.closed == false && room.status == "waitingForPlayers" && room.id == gameId && room.host.token == me.token);
      if (game === undefined){
        socket.emit("exception", { errorMessage: "game not found" });
        return;
      }
      if (!game.pendingUsers.includes(attendee)){
        socket.emit("exception", { errorMessage: "user not found" });
        return;
      }
      socket.to(game.id).emit("userJoining", {room: game});
      socket.to(attendee.status + attendee.username).emit("acceptedJoin", {gameId: game.id});
    } catch (error) {
      console.log(error);
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
  socket.on('denyJoin', function(data){
    var gameId = data.gameId;
    var gameCode = data.gameCode;
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      var attendee = users.find(
        (user) =>
          user.username == data.attendee &&
          user.status == "asking" + gameCode
      );
      if (attendee === undefined){
        socket.emit("exception", { errorMessage: "user not found" });
        return;
      }
      console.log('-----------------------');
      console.log(data, gameId);
      var game =rooms.find((room) => room.closed == false && room.status == "waitingForPlayers" && room.id == gameId && room.host.token == me.token);
      if (game === undefined){
        socket.emit("exception", { errorMessage: "game not found" });
        return;
      }
      if (!game.pendingUsers.includes(attendee)){
        socket.emit("exception", { errorMessage: "user not found" });
        return;
      }
      game.pendingUsers.pop(attendee);
      oldstatus = attendee.status;
      attendee.status = 'idle';
      me.lastAlive = Date.now();
      attendee.lastAlive = Date.now();
      socket.to(game.id).emit("userDenied", {room: game});
      socket.to(oldstatus + attendee.username).emit("deniedJoin", {session: attendee});
    } catch (error) {
      console.log(error);
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
  socket.on('joinLobby', function(data){
    var gameId = data.gameId;
    try {
      if (!tokens.verify(secret, data.session.token)) {
        socket.emit("exception", { errorMessage: "csrf triggered" });
        return;
      }
      var me = users.find(
        (user) =>
          user.token == data.session.token &&
          user.username == data.session.username &&
          user.userAgent == socket.request.headers["user-agent"]
      );
      console.log('-----------------------');
     console.log(data, gameId);
      var game =rooms.find((room) => room.closed == false && room.status == "waitingForPlayers" && room.id == gameId);
      if (game === undefined){
        socket.emit("exception", { errorMessage: "game not found" });
        return;
      }
      if (!game.pendingUsers.includes(me)){
        socket.emit("exception", { errorMessage: "user not found" });
        return;
      }
      me.status = "inLobby" + game.code;
      me.lastAlive = Date.now();
      game.pendingUsers.pop(me);
      game.users.push(me);
      socket.join(game.id);
      socket.to(game.id).emit("userJoined", {room:game});
      socket.emit("joinedLobby", {session: me, room: game});
    } catch (error) {
      socket.emit("exception", { errorMessage: "bad request" });
      return;
    }
    
  });
});

const PORT = process.env.PORT || 3030;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
