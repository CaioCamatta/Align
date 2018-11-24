/* This file takes care of taking the pictures */
// Google API stuff
const googleVision = remote.require("./vision.js");
const algorithm = remote.require("./algorithm.js");

// Reference the video element
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Create variable that that references stream
var localStream;

// Interval between snapshots
const INTERVAL = 10000;

// Get access to the camera
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();

        // Keep reference of the stream so we can stop it later
        localStream = stream;
    });
}

setInterval(async function(){

  context.drawImage(video, 0, 0, 640, 480);

  // Save image to variable
  var image = canvas.toDataURL("image/jpeg");

  const imageData = await googleVision.analyzePhoto(image);
  console.log("imageData", imageData)

  context.beginPath();
  context.moveTo(imageData.boundingVerticies[0].x, imageData.boundingVerticies[0].y);
  context.lineTo(imageData.boundingVerticies[1].x, imageData.boundingVerticies[1].y);
  context.lineTo(imageData.boundingVerticies[2].x, imageData.boundingVerticies[2].y);
  context.lineTo(imageData.boundingVerticies[3].x, imageData.boundingVerticies[3].y);

  context.fill();

  console.log(algorithm.posture(imageData))

}, INTERVAL);


document.getElementById("calibrateBtn").addEventListener("click", function () {

  context.drawImage(video, 0, 0, 640, 480);

  // // Save image to variable
  var image = canvas.toDataURL("image/jpeg");

  googleVision.analyzePhoto(image).then((data) => {
    console.log("image data", data);
    algorithm.calibrate(data)
  })
});


document.getElementById("statBtn").addEventListener("click", function () {
  console.log(algorithm.getCalibrated())
});
