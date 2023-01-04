// Importing the required modules
const WebSocketServer = require('ws');
require('dotenv').config()

 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: process.env.PORT })
 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        ws.send(data.toString())
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has Disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");