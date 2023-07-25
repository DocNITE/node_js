// DOPILIT FOR TYPESCRIPT !!!!!!!!!!!

import * as PIXI from 'pixi.js';
import wallsAtlas from './../images/walls.json';
import { io } from "socket.io-client";

let app = new PIXI.Application<HTMLCanvasElement>({ resizeTo: window });
document.body.appendChild(app.view);

let socket = io({reconnection: false});

socket.on('sync', (data) => {
    console.log(data); 
    socket.emit('sync', data);
})

// Initialize, when client was connected
socket.on('init', (data) => {
    document.title = data.hostname;
    // TODO NEEd rework client. Maybe use another draw lib
})

socket.on('disconnect', (reason) => {
    console.log("Client network was closed!");
    socket.close();
})