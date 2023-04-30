let socket = io();

socket.on('sync', (msg) => {
    console.log(msg);
    socket.emit('sync', "send from one client");
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