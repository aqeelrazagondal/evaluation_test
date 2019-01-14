var express = require("express");
var weather = require("weather-js");
var ip = require("ip");
const iplocation = require("iplocation").default;

var app = express();

app.get("/", function(req, res) {
  res.send("Server is running");
});

app.get("/city/:cityname", function(req, res) {
  let city = req.params.cityname;
  // Options:
  // search:     location name or zipcode
  // degreeType: F or C
  weather.find({ search: city, degreeType: "F" }, function(err, result) {
    if (err) res.json(err);

    let response = {
      city: result[0].location["name"],
      temperature: result[0].current["temperature"]
    };
    res.send(response);
  });
});

app.get("/currentLocationTemp", function(req, res) {
  let ipAddress = ip.address();
  console.log("Ip address ", ipAddress);
  iplocation(ipAddress, [], (error, resp) => {
    if (error) res.send(error);

    console.log(resp);
    // Options:
    // search:     location name or zipcode
    // degreeType: F or C
    let city = resp["city"];
    console.log(city.length);
    if (city.length > 1) {
      weather.find({ search: city, degreeType: "F" }, function(err, result) {
        if (err) res.json(err);

        let response = {
          city: result[0].location["name"],
          temperature: result[0].current["temperature"]
        };
        res.send(resp);
      });
    } else {
      res.send({
        status: false,
        message: "City not found by Ip Address"
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
