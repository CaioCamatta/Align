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
      buildNotificationWindow()
    }

    if (win.isVisible() === false && shown === false) {
      player.play("assets/notification.mp3");
      win.show();
      shown = true;
      setTimeout(() => {shown = false}, 300000) // alerts the user after 5 mins (300000)
    }
}

function buildNotificationWindow() {
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

function dismissNotification(){
  if (win != null) {
    win.hide();
  }
  shown = false
}



//Enter calibration process
function calibrate(){
    buildNotificationWindow();

    //show help text while calibrating
    var icon = document.getElementById("loadIcon");
    if (icon.style.display == "none") {
        icon.style.display = "block";
    }
    else {
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
