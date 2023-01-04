// Importing the required modules
const WebSocketServer = require('ws');
require('dotenv').config()
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: process.env.PORT })
 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    ws.send();
    
    // sending message
    ws.on("message", data => {
        let message;
        console.log(data);

        try {
          message = JSON.parse(data);
          console.log(message)
        } catch (e) {
          sendError(ws, 'Wrong format');
    
          return;
        }
    
        if (message.type === 'NEW_MESSAGE') {
            console.log(message.type)
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocketServer.OPEN) {
              client.send(JSON.stringify(JSON.parse(data)));
            }
          });
        }
        
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has Disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
    const sendError = (ws, message) => {
        const messageObject = {
          type: 'ERROR',
          payload: message,
        };
      
        ws.send(JSON.stringify(messageObject));
      };

});
console.log("The WebSocket server is running on port 8080");