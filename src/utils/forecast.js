const forecast = (x, y, callback) => {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    encodeURIComponent(x) +
    "&longitude=" +
    encodeURIComponent(y) +
    "&current_weather=true&daily=temperature_2m_max,precipitation_probability_max&timezone=auto";
  fetch(url)
    .then(res => res.json())
    .then(body => {
      if (body.error) {
        callback("Don't know where that is bro", undefined);
      } else {
        const current = body.current_weather;
        const daily = body.daily;
        callback(
          undefined,
          "It is currently " +
            current.temperature +
            "°C with a high of " +
            daily.temperature_2m_max[0] +
            "°C. There is a " +
            daily.precipitation_probability_max[0] +
            "% chance of rain today, with wind speeds of " +
            current.windspeed +
            " km/h."
        );
      }
    })
    .catch(() => callback("can't get da weather bro", undefined));
};

module.exports = forecast;
