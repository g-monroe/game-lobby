const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
let users = [];
io.on('connection', (socket) => {
  console.log('yep!');
  socket.emit('userJoined');
  // forward the private message to the right recipient
  socket.on('movePlayer', (data) => {
    console.log(data);
    socket.broadcast.emit('updatePlayer', data);
  });

  // notify users upon disconnection
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3030;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
