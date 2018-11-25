const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const { remote, ipcRenderer, ipcMain } = require('electron');
const player = require('play-sound')(opts = {})


//Notification Popup
// var notificationSound = new Audio(require('./notification.mp3'));
let win = null;
let shown = false;
function showNotification(){

    if (win == null) {

      let display = electron.screen.getPrimaryDisplay();
      let width = display.bounds.width;

      win = new BrowserWindow({
        width: 340,
        height: 120,
        movable: true,
        x: width - 300,
        y: 20,
        frame: false,
        show: false,
      });
      win.loadFile('popup.html');
    }

    if (win.isVisible() === false && shown === false) {
      player.play("assets/notification.mp3");
      win.show();
      shown = true;
      setTimeout(() => {shown = false}, 300000) // alerts the user after 5 mins (300000)
    }
}

function dismissNotification(){
  if (win != null) {
    win.hide();
  }
}



//Enter calibration process
function calibrate(){

    //show help text while calibrating
    var icon = document.getElementById("loadIcon");
    var x = document.getElementById("help");
    if (x.style.display == "none") {
        x.style.display = "block";
        icon.style.display = "block";
    }
    else {
        x.style.display = "none";
        icon.style.display = "none";
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

//exit program
document.getElementById('exit').addEventListener('click', (event) => {
    remote.app.quit();
});