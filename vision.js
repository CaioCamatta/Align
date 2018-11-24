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

    important_data  = {
      "boundingVerticies": data.responses[0].faceAnnotations[0].boundingPoly.vertices,

    };

    return important_data
  }));
};

