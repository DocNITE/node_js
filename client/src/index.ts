// DOPILIT FOR TYPESCRIPT !!!!!!!!!!!

import * as PIXI from 'pixi.js';
import wallsAtlas from './../images/walls.json';
import { io } from "socket.io-client";

let app = new PIXI.Application<HTMLCanvasElement>({ resizeTo: window });
document.body.appendChild(app.view);

/*
const app = new PIXI.Application({
  width: canvasWidth,
  height: canvasHeight,
  backgroundColor: 0x1099bb,
  resolution: 2 * window.devicePixelRatio,
});
 */

/*
const spritesheet = new PIXI.Spritesheet(
	PIXI.BaseTexture.from(wallsAtlas.meta.image),
	wallsAtlas
);

// Generate all the Textures asynchronously
async () => {
    await spritesheet.parse(); 
}

// spritesheet is ready to use!
const anim = new PIXI.AnimatedSprite(spritesheet.animations.wall);

// set the animation speed 
anim.animationSpeed = 0.1666;

// play the animation on a loop
anim.play();

// add it to the stage to render
app.stage.addChild(anim);

app.ticker.add((delta) => {
    //console.log(delta);
});
*/

let socket = io();

socket.on('sync', (data) => {
    console.log(data); 
    socket.emit('sync', data);
})

socket.on('init', (data) => {
    document.title = data.hostname;
})

//const socket = new WebSocket("ws://127.0.0.1:5500");
//
//// Connection opened
//socket.addEventListener("open", (event) => {
//    socket.send("Hello Server!");
//});
//  
//// Listen for messages
//socket.addEventListener("message", (event) => {
//    console.log("Message from server ", event.data);
//});