const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const { remote, ipcRenderer } = require('electron');

//Notification Popup
function notify(){


    let display = electron.screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;

    let win = new BrowserWindow({
        width: 280,
        height: 80,
        movable: true,
        x: width - 300,
        y: height - 100,
        frame: false,
    })
    win.loadFile('popup.html');
    setTimeout(function(){ win.close() }, 5000);
}

//Enter calibration process
function calibrate(){
    document.getElementById("calibrateBtn").innerHTML = "Calibrating...";

    //show help text while calibrating
    var x = document.getElementById("help");
    if (x.style.display == "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }

    //Calibration process goes here

    //Call reset process
    setTimeout(calibrateDone, 10000);
}

//reset everything after calibration is complete
function calibrateDone(){

    document.getElementById("calibrateBtn").innerHTML = "All set!";
    var helperInfo = document.getElementById("help");
    helperInfo.style.display = "none";

    setTimeout(function() { document.getElementById("calibrateBtn").innerHTML = "Calibrate"; }, 5000);

}

//minimize program window
document.getElementById('minimize').addEventListener('click', (event) => {
    remote.getCurrentWindow().minimize();
});

//min or max program window
document.getElementById('min-max').addEventListener('click', (event) => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()){
        currentWindow.unmaximize();
    }
    else{
        currentWindow.maximize();
    }
});

//exit program
document.getElementById('exit').addEventListener('click', (event) => {
    remote.app.quit();
});