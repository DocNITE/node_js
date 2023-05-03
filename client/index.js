import * as PIXI from './src/pixi.mjs'
import wallsAtlas from './images/walls.json' assert {type: "json"};
//import {damsdsd} from './sharedTest.js'
//console.log(damsdsd);
/**
 * Крч слушай
 веб разработка - это та еще ебанина
 я каое как смог настроить node js на работу так:
 у нас есть ебучий сервер, который будет обрабатывать собсна логику игры
 и походк. вот как это будет выглядить:
 с клиента на сервер мы кидаем свои данные, ну типа ивенты на перемещение, взять чота, сделоть
 а сервер это переваривает, и СИНХРОНИЗИРУЕТ на другие подключенные клиенты. Получается так
 что обновление идет от каждого запроса от сервера через socket.io
 а сейчас чо нужна сделать:
 1. организовать рендеринг картинки через Pixi.JS
 2. GameController для сервера и клиента.
 3. shared скрипты. Просто в планах создавать один и тот же класс, но просто синхронить 
 3.5 shared не получится сделать, потому что клиент ЕГО НЕ ВИДИТ СУКА У БЛЯ
 со сервера на клиенты, и наоборот

 и да, FUCK YEAH, YA MOGU USAT MODULES, уУУУУ СУКА, НЕ МОГУ БЛЯ. Это имбище.
 никакие вебпаки нах ненужны, и его бандлеры, ведь я могу юзать модули! Это чтобы не
 спамить в один файл весь код. Хотя пох, сейчас всего-то 40 строк ебать
 */

let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);

/*
const app = new PIXI.Application({
  width: canvasWidth,
  height: canvasHeight,
  backgroundColor: 0x1099bb,
  resolution: 2 * window.devicePixelRatio,
});
 */

const spritesheet = new PIXI.Spritesheet(
	PIXI.BaseTexture.from(wallsAtlas.meta.image),
	wallsAtlas
);

// Generate all the Textures asynchronously
await spritesheet.parse();

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

let socket = io();

socket.on('sync', (data) => {
    console.log(data); 
    socket.emit('sync', data);
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