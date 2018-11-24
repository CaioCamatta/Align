/* This files receives the image data as input and tells you whether your posture is good or not*/
// Variable to store calibration data
let calibratedFace = {};

// Margins of error for the calibration data
const POSITION_LIMIT = 30; // Allow head to be X pixels lower than calibration.
const PROXIMITY_LIMIT = 20; // Allow head box size to be X pixels greater than calibration.
const TILT_LIMIT = 4; // Allow head tilt to be X degrees lower than calibration.

// Main function to evaluate posture
module.exports.posture = (imageData) => {
  console.log(imageData)
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
  if(inner_vertices[0].y < c_inner_vertices[0].y + POSITION_LIMIT){
    console.log('Head position: good')
  } else {
    console.log('Head too low!');
    return false;
  }

  // Check head proximity
  const current_box_size = inner_vertices[1].x - inner_vertices[0].x;
  const calibration_box_size = c_inner_vertices[1].x - c_inner_vertices[0].x + PROXIMITY_LIMIT;

  // Compare the size of the calibration box to the current box size
  if(current_box_size < calibration_box_size){
    console.log('Head proximity: good')
  } else {
    console.log('Head too close!');
    return false;
  }

  // Check head tilt
  if(tilt > c_tilt - TILT_LIMIT){
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
