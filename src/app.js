const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "Rathin Mal"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Rathin Mal"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    text: "God helps those who help themselves",
    name: "Rathin Mal"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, weatherData) => {
        if (error) return res.send({ error });
        res.send({
          location,
          weather: weatherData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search query"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
    name: "Rathin Mal",
    message: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
    name: "Rathin Mal",
    message: "Page not found"
  });
});
//app.com
//app.com/help
//app.com/about
//app.com/weather

//to start up the server:
app.listen(port, () => {
  console.log("The server is up! on port " + port);
});
