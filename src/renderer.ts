/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './style/main.css'
// @ts-ignore
import { ipcRenderer } from 'electron'
import { IpcRendererEvent } from 'electron/main'

// Comment line below for easier UI debugging
//document.getElementById("robot-commands").style.display = "none"


// Prompt the user for an IP address to connect to
const connectButton = document.getElementById('connect-button')
connectButton.addEventListener('click', () => {
    ipcRenderer.send('connect')
})

function showMessage(msg: String) {
    document.getElementById("messages").innerHTML += msg + "<br>"
}

ipcRenderer.on("connection-status", (event: IpcRendererEvent, ...args: any[]) => {
    var isConnected: boolean = args[0]
    console.log("Connected websocket")
    document.getElementById("connection-status").innerHTML = isConnected ? "Connected" : "Not Connected"
    document.getElementById("about-message").style.display = isConnected ? 'none' : 'block'
    document.getElementById("robot-commands").style.display = isConnected ? 'flex' : 'none'
})

ipcRenderer.on("ws-message", (event: IpcRendererEvent, ...args: any[]) => {
    var messageData = args[0]
    var type: string = messageData["type"]

    console.log(type)

    if (type == "text") {
        showMessage(messageData["text"])
    }
    else if (type == "enable-motor") {
        var motor = messageData["motor"]
        var enabled = <Boolean> messageData["enabled"];

        (<HTMLInputElement> document.getElementById("set-motor-" + motor + "-power")).disabled = !enabled
    }
    else if (type == "motor-power") {
        var motor = messageData["motor"]
        var power = messageData["power"];

        document.getElementById("motor-" + motor + "-power").innerHTML = power
    }
    else if (type == "enable-servo") {
        var servo = messageData["servo"]
        var enabled = <Boolean> messageData["enabled"];

        (<HTMLInputElement> document.getElementById("set-servo-" + servo  + "-position")).disabled = !enabled
    }
    else if (type == "servo-position") {
        var motor = messageData["servo"]
        var power = messageData["position"];

        document.getElementById("servo-" + motor + "-position").innerHTML = power
    }
})

function setMotorPower(motor: number, power: number) {
    ipcRenderer.send('set-motor-power', motor, power)
}

function setServoPosition(servo: number, position: number) {
    ipcRenderer.send('set-servo-position', servo, position)
}

document.getElementById("set-motor-" + 0 + "-power").addEventListener('click', () => setMotorPower(0, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 1 + "-power").addEventListener('click', () => setMotorPower(1, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 2 + "-power").addEventListener('click', () => setMotorPower(2, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 3 + "-power").addEventListener('click', () => setMotorPower(3, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 4 + "-power").addEventListener('click', () => setMotorPower(4, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 5 + "-power").addEventListener('click', () => setMotorPower(5, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 6 + "-power").addEventListener('click', () => setMotorPower(6, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))
document.getElementById("set-motor-" + 7 + "-power").addEventListener('click', () => setMotorPower(7, parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)))

//Servo
document.getElementById("set-servo-" + 0 + "-position").addEventListener('click', () => setServoPosition(0, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 1 + "-position").addEventListener('click', () => setServoPosition(1, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 2 + "-position").addEventListener('click', () => setServoPosition(2, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 3 + "-position").addEventListener('click', () => setServoPosition(3, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 4 + "-position").addEventListener('click', () => setServoPosition(4, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 5 + "-position").addEventListener('click', () => setServoPosition(5, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 6 + "-position").addEventListener('click', () => setServoPosition(6, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 7 + "-position").addEventListener('click', () => setServoPosition(7, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 8 + "-position").addEventListener('click', () => setServoPosition(8, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 9 + "-position").addEventListener('click', () => setServoPosition(9, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 10 + "-position").addEventListener('click', () => setServoPosition(10, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))
document.getElementById("set-servo-" + 11 + "-position").addEventListener('click', () => setServoPosition(11, parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)))

function setAllMotorPower(power: number) {
    for (var i = 0; i < 8; i++) {
        // Check if that motor is enabled using the "disabled" property on its "set power" button
        if (!(<HTMLInputElement> document.getElementById("set-motor-" + i + "-power")).disabled) {
            setMotorPower(i, power)
        }
    }
}

function setAllServoPosition(position: number) {
    for (var i = 0; i < 12; i++) {
        setServoPosition(i, position)
    }
}

document.getElementById("set-all-motor-powers").addEventListener('click', () => {
    var power = parseFloat((<HTMLInputElement> document.getElementById("motor-power-input")).value)
    setAllMotorPower(power)
})

document.getElementById("set-all-servo-positions").addEventListener('click', () => {
    var position = parseFloat((<HTMLInputElement> document.getElementById("servo-position-input")).value)
    setAllServoPosition(position)
})

document.getElementById("ono").addEventListener('click', () => {
    setAllMotorPower(0.0)
})
