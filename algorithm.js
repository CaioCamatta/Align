/* This files receives the image data as input and tells you whether your posture is good or not*/
// Variable to store calibration data
var calibrationData = [100, 250, -6];

// Main function to evaluate posture
module.exports.posture = (imageData) => {
  outer_vertices = imageData.boundingVerticies;
  inner_vertices = imageData.fdBoundingVerticies;
  roll = imageData.roll;
  pan = imageData.pan;
  tilt =imageData.tilt;

  // Check head position
  if(outer_vertices[0].y < calibrationData[0]){
    console.log('Head position: good')
  } else {
    console.log('Head too low!')
    return false;
  };

  // Check head proximity
  current_box_size = inner_vertices[1].x - inner_vertices[0].x;
  calibration_box_size = calibrationData[1];

  // Compare the size of the calibration box to the current box size
  if(current_box_size < calibration_box_size){
    console.log('Head proximity: good')
  } else {
    console.log('Head too close!')
    return false;
  };

  // Check head tilt
  if(tilt > calibrationData[2]){
    console.log('Head tilt: good')
  } else {
    console.log('Head too tilted!')
    return false;
  };
};

/*
Types of bad posture:
  head position
  head proximity
  tilt
*/
