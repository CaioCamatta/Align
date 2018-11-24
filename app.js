const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const { remote, ipcRenderer } = require('electron');

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
    document.getElementById("calibrateBtn").innerHTML = "Calibrating...";

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

document.getElementById('minimize').addEventListener('click', (event) => {
    remote.getCurrentWindow().minimize();
});

document.getElementById('min-max').addEventListener('click', (event) => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()){
        currentWindow.unmaximize();
    }
    else{
        currentWindow.maximize();
    }
});

document.getElementById('exit').addEventListener('click', (event) => {
    remote.app.quit();
});