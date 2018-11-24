/* This files receives the image data as input and tells you whether your posture is good or not*/
// Variable to store calibration data
var calibrationData = [100];

let calibratedFace = {};

// Main function to evaluate posture
module.exports.posture = (imageData) => {
  outer_vertices = imageData.boundingVerticies;
  inner_vertices = imageData.fdBoundingVerticies;
  roll = imageData.roll;
  pan = imageData.pan;
  tilt =imageData.tilt;

  // Compare current image with calibration data
  if(outer_vertices[0].y < calibrationData[0]){
    return true;
  } else {
    return false;
  };
};


module.exports.calibrate = (imageData) => {
  calibratedFace = imageData;
  console.log("Calibrated!", calibratedFace);
};