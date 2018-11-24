const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

//Notification Popup
function doNotify(){
    let win = new BrowserWindow({
        width: 300,
        height: 120,
        frame: false,
    })
    win.setPosition(500,500)
    win.loadFile('popup.html');
    setTimeout(function(){ win.close() }, 3000);
}

//Enter calibration process
function calibrate(){

}

