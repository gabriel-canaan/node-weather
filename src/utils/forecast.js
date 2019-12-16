const request = require("request");

const forecast = (x, y, callback) => {
  const url =
    "https://api.darksky.net/forecast/bc6e688f80ac088af786e186a517e032/" +
    encodeURIComponent(x) +
    "," +
    encodeURIComponent(y) +
    "?units=si";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("can't get da weather bro", undefined);
    } else if (body.error) {
      callback("Don't know where that is bro", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is " +
          body.currently.temperature +
          " degrees. there is " +
          body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
