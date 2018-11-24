/* This file takes care of taking the pictures */4

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
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
});
