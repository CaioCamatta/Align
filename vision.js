const {googleVisionApiKey} = require("./keys.js");

const fetch = require("node-fetch");

module.exports.analyzePhoto = (imageContent) => {
  const url = "https://vision.googleapis.com/v1/images:annotate?key=" + googleVisionApiKey

  var base64Image = imageContent.split(',')[1];


  const data = {
    "requests": [{
      "image": {"content": base64Image},
      "features": [{"type": "FACE_DETECTION", "maxResults": 5}]
    }]
  };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),

  }).then(function(response) { return response.json(); }).then((data => {

    let important_data;

    try {
       important_data  = {
        "boundingVerticies": data.responses[0].faceAnnotations[0].boundingPoly.vertices,
        "fdBoundingVerticies": data.responses[0].faceAnnotations[0].fdBoundingPoly.vertices,
        "roll": data.responses[0].faceAnnotations[0].rollAngle,
        "pan": data.responses[0].faceAnnotations[0].panAngle,
        "tilt": data.responses[0].faceAnnotations[0].tiltAngle,
      };
    } catch {
      console.log("ERROR GETTING FACE DATA");
      important_data = data
    }
    return important_data
  }));
};
