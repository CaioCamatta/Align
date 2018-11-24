const { remote } = require('electron');
const googleVision = remote.require("./vision.js");

/* This file takes care of taking the pictures */

// Reference the video element
var video = document.getElementById('video');

// Get access to the camera
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// Elements for taking the photo
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Take the picture when button is pressed
document.getElementById("snap").addEventListener("click", async function () {
  // Draw the image (we might not need this)
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

});
