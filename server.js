var express = require("express");
var weather = require("weather-js");
var ip = require("ip");
const iplocation = require("iplocation").default;

var app = express();
var port = 3000;

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
    res.json(response);
  });
});

app.get("/currentLocationTemp", function(req, res) {
  let ipAddress = ip.address();
  console.log("Ip address ", ipAddress);
  iplocation(ipAddress, [], (error, resp) => {
    if (error) res.json(error);

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
        res.json(resp);
      });
    } else {
      res.json({
        status: false,
        message: "City not found by Ip Address"
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
