/* This file takes care of taking the pictures */
// Reference the video element
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Create variable that that references stream
var localStream;

// Interval between snapshots
const INTERVAL = 5000;

setInterval(function(){
  // Get access to the camera
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.srcObject = stream;
          video.play();

          // Keep reference of the stream so we can stop it later
          localStream = stream;
      });
  }

  setTimeout(function(){
    context.drawImage(video, 0, 0, 640, 480);

    // Save image to variable
    var image = canvas.toDataURL("image/jpeg");

    console.log(image)

    localStream.getVideoTracks()[0].stop();

  }, 1400);
}, INTERVAL);
