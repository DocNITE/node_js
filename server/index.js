const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const config = require('./../config.json');

// path for initialize static files
const clientPath = __dirname + '/../client';
app.use(express.static(clientPath));
//const sharedPath = __dirname + '/../shared';
//app.use(express.static(sharedPath));
// send html page (client scripts) for user
app.get('/', (req, res) => {
  res.sendFile(clientPath + '/index.html');
});
// used, when user was connected
//let users = {};
io.on('connection', (socket) => {
  // //users.push({socket: socket, id: users.length})
  console.log('Connected user: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('Disconnected user: ' + socket.id);
  });
  // Get message from client
  socket.on('sync', (data) => {
    console.log(data.toString());
  })
  // send test message to all clients fucKYYEYE YYEYYE Y
  io.emit('sync', {fuck: "ну и как член на вкус?", fuck2: 1});
});
// start server bruh
server.listen(5500, () => {
  console.log(`Server running at http://localhost:${5500}/`);
});

/*
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5500;

const server = http.createServer((listener, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  fs.createReadStream('./../index.html').pipe(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('connection', (stream) => {
  console.log(stream.remoteAddress);
})

server.on('data', (chunk) => {
  console.log(chunk.toString());
})
*/