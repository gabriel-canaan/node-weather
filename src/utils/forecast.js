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
          " It is currently " +
          body.currently.temperature +
          " degrees with a high of " +
          body.daily.data[0].temperatureHigh +
          " . There is " +
          body.currently.precipProbability * 100 +
          "% chance of rain just now, " +
          "with wind gusts of " +
          body.currently.windGust +
          "kph" +
          " and the closest storm is " +
          body.currently.nearestStormDistance +
          " kilometers away"
      );
    }
  });
};

module.exports = forecast;
