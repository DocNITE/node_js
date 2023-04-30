const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//app.set('view engine', 'ejs');
const clientPath = __dirname + '/../client';
app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(clientPath + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('sync', (msg) => console.log(msg))
  io.emit('sync', "synch on all clients");
});

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