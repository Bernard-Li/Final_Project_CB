const express = require('express');
const PORT = 8000;

const { createUser } = require("./handlers/createuser");
const { getCurrentWeather } = require("./handlers/weatherapi");
const { uploadImage } = require("./handlers/uploadimage");
const app = express();

//higher limit to allow uploading of greater sized data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//test end point to see if backend is listening => functional in insomnia
app.get('/testlogin', (req, res) =>{
  res.status(200).json({status: 'success', data: 'here is the index'})
})

app.get('/api/currentweather', getCurrentWeather)


app.post('/api/create-user', createUser);
app.post('/api/upload', uploadImage);

const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});