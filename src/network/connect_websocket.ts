// This code should be run in the MAIN thread, not the renderer
import { ipcMain, IpcMainEvent } from 'electron';
import WebSocket from 'ws';

function connectRobotWebsocket(event: IpcMainEvent): WebSocket {
    console.log("Connecting to websocket");
    const ip = "192.168.43.1:50000"; // This SHOULD always be the same
    const socket = new WebSocket(`ws://${ip}`);

    socket.onopen = () => {
        console.log("Connected to server");
        event.sender.send("connection-status", true)
    }
    socket.onmessage = (_event) => {
        console.log(_event.data);
        event.sender.send("ws-message",JSON.parse(_event.data.toString()))
    }
    socket.onclose = () => {
        console.log("Disconnected from server");
        event.sender.send("connection-status", false)
    }
    socket.onerror = (error) => {
        console.log(error);
    }

    // Set the global websocket variable
    globalThis.websocket = socket;

    return socket;
}

export { connectRobotWebsocket };