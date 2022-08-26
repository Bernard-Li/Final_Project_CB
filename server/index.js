const express = require('express');
const PORT = 8000;

const { createUser } = require("./handlers/createuser");
const { getCurrentWeather } = require("./handlers/weatherapi");
const app = express();

app.use(express.json());
//test end point to see if backend is listening => functional in insomnia
app.get('/testlogin', (req, res) =>{
  
  res.status(200).json({status: 'success', data: 'here is the index'})
})

app.get('/currentweather', getCurrentWeather)


app.post('/create-user', createUser);

const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});