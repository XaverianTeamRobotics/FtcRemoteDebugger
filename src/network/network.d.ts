import WebSocket from 'ws';

// Declare a global variable to store the websocket
// Remember we are still in the MAIN thread

declare global {
    var websocket: WebSocket;
}