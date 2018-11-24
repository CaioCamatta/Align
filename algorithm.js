/* This files receives the image data as input and tells you whether your posture is good or not*/
// Variable to store calibration data
var calibrationData = [100];

let calibratedFace = {};

// Main function to evaluate posture
module.exports.posture = (imageData) => {
  vertices = imageData.boundingVerticies;

  // Compare current image with calibration data
  if(vertices[0].y < calibrationData[0]){
    console.log(vertices[0].y);
    return true;
  } else {
    return false;
  };
};


module.exports.calibrate = (imageData) => {
  calibratedFace = imageData;
  console.log("Calibrated!", calibratedFace);
};