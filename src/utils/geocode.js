const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiMTIzZGF2ZTEyMyIsImEiOiJjazNmMWhhbG4wMDVxM25wNnlidzg2YW16In0.WGdP5fAFFbL_Jmu5O_FxKA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("It's not leting me read the dumb atlas", undefined);
    } else if (body.features.length === 0) {
      callback("Sure that's a real place cuz?", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
