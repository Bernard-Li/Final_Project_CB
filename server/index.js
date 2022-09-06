const express = require('express');
const morgan = require('morgan');

const { createUser } = require("./handlers/createuser");
const { getCurrentWeather, getWeatherHistory } = require("./handlers/weatherapi");
const { travelCardUpload } = require("./handlers/travelCardUpload");
const { allTravelCards } = require("./handlers/allTravelCards");
const { deleteCard } = require("./handlers/deleteCard");

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
//End point for the current weather on the travel card expanded page
app.get('/api/currentweather/', getCurrentWeather);
//End point for the weather history, also displayed on the travel card page
app.get('/api/getWeatherHistory/', getWeatherHistory);
//Fetch all travel cards to load onto the homepage
app.get('/api/all-travelcards/', allTravelCards);
//Create a user when they a google account to log into Auth0. If they already exist, validated by e-mail, do nothing.
app.post('/api/create-user', createUser);
//POST to create a new travel card
app.post('/api/upload-travelcard', travelCardUpload);
//DEL to erase a complete card in the travel card expanded view
app.delete('/api/delete-card/:_id', deleteCard);

const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});