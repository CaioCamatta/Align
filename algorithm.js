/* This files receives the image data as input and tells you whether your posture is good or not*/
// Variable to store calibration data
var calibrationData = [100, 250, -6];

let calibratedFace = {};

// Main function to evaluate posture
module.exports.posture = (imageData) => {
  // Current image data
  const inner_vertices = imageData.fdBoundingVerticies;
  const roll = imageData.roll;
  const pan = imageData.pan;
  const tilt =imageData.tilt;

  // Calibration data
  const c_inner_vertices = calibratedFace.fdBoundingVerticies;
  const c_roll = calibratedFace.roll;
  const c_pan = calibratedFace.pan;
  const c_tilt =calibratedFace.tilt;

  // Check head position
  if(inner_vertices[0].y < c_inner_vertices[0].y){
    console.log('Head position: good')
  } else {
    console.log('Head too low!');
    return false;
  }

  // Check head proximity
  const current_box_size = inner_vertices[1].x - inner_vertices[0].x;
  const calibration_box_size = c_inner_vertices[1].x - c_inner_vertices[0].x;

  // Compare the size of the calibration box to the current box size
  if(current_box_size < calibration_box_size){
    console.log('Head proximity: good')
  } else {
    console.log('Head too close!');
    return false;
  }

  // Check head tilt
  if(tilt > c_tilt){
    console.log('Head tilt: good')
  } else {
    console.log('Head too tilted!');
    return false;
  }
  return true
};


module.exports.calibrate = (imageData) => {
  calibratedFace = imageData;
  console.log("Calibrated!", calibratedFace);
};

module.exports.getCalibrated = () => {
  console.log("Saved data:", calibratedFace);
  return calibratedFace
};
