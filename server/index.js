const express = require('express');
const morgan = require('morgan');

const { createUser } = require("./handlers/createuser");
const { getCurrentWeather, getWeatherHistory } = require("./handlers/weatherapi");
const { quickLogUpload } = require("./handlers/quickLogUpload");
const { allTravelCards } = require("./handlers/allTravelCards");

const app = express();
const PORT = 8000;

//higher limit to allow uploading of greater sized data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('tiny'));
//test end point to see if backend is listening => functional in insomnia
app.get('/testlogin', (req, res) =>{
  console.log(req.body);
  res.status(200).json({status: 'success', data: 'here is the index'})
})

app.get('/api/currentweather', getCurrentWeather);
app.get('/api/getWeatherHistory', getWeatherHistory);
app.get('/api/all-travelcards', allTravelCards);
app.post('/api/create-user', createUser);
app.post('/api/upload-quicklog', quickLogUpload);

const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});