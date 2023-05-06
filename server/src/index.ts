import config from './../../shared/config.json';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import Discord from 'discord.js'
// some defines
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// path for initialize static files
const clientPath = __dirname + '/../client';
app.use(express.static(clientPath));
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

  })
  // send test message to all clients fucKYYEYE YYEYYE Y
  io.emit('sync', "none"); //{fuck: "ну и как член на вкус?", fuck2: 1}
});
// start server bruh
server.listen(config.port, () => {
  console.log(`Server running! Join at http://localhost:${config.port}/ for debug`);
});

// discord bot
if (config.discord_bot) {
  const DiscordClient = new Discord.Client({ 
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.DirectMessages] 
  });

  DiscordClient.on("ready", () => {
    console.log(DiscordClient.user.tag + " was running!");
  });

  DiscordClient.on("messageCreate", (message) => {
    //message.channel.send("Huh?");
  })

  DiscordClient.login(config.discord_bot_token);
}
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