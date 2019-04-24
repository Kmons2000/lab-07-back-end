const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent')
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/location', (req, res) => {
  try {
    res.send(findLatLong(req.query.data));
  } catch (error) {
    console.error(error)
    handleErrors(res);
  }
});

app.get('/weather', (req, res) => {
  try {
    res.send(getWeather());
  } catch (error) {
    handleErrors(res);
  }
});

const getWeather = () => {
  const darkSkyData = require('./data/darksky.json');
  const weatherArr = darkSkyData.daily.data.map(x => {
    return new Weather(x);
  })
  return weatherArr;
};

function Weather(data) {
  this.forecast = data.summary;
  this.time = new Date(data.time * 1000).toString().slice(0, 15);
}

const findLatLong = (query, res) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?addres=${req.query.data}&key=${process.env.GEOKEY}`;
  return superagent.get(url)
    .then(res => {
      console.log(res);
      response.status(200)
      response.send(new Location(request.data.query, res))
    }).catch(error => {
      response.status(500);
      response.send(error);
    })
  // const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  return location;
};

function Location(query, data) {
  (this.searchQuery = query),
  (this.formattedQuery = data.results[0].formatted_address),
  (this.latitude = data.results[0].geometry.location.lat),
  (this.longitude = data.results[0].geometry.location.lng);
}

// ERROR HANDLING

const handleErrors = (res) => {
  res.status(500)
    .send({ Status: 500, responseText: 'Sorry, something went wrong!' });
    
};

app.listen(port, () => console.log('Listening!!!'));
