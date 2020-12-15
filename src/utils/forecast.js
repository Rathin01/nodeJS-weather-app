const request = require("request");
const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d22857e5e40c8b12902b3c448162332e&query=" +
    lat +
    "," +
    lon;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees outside, but feels like " +
          body.current.feelslike +
          " degrees."
      );
    }
  });
};

module.exports = forecast;
