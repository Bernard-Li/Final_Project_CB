const axios = require('axios');
require("dotenv").config();
//API handler that is tied to Weather.js, currently not in use. 
const getCurrentWeather = async (req, res) => {
  const location = req.query.local;
  console.log(location);
  //using (?) the location parameter to receive a specific selection from the user on the front end
  try {
    const currentWeather =  await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: process.env.WEATHERAPI_KEY,
        q: location
      }
    })
    res.status(200).json({status: 200, data: currentWeather.data, message: `Current weather for ${location}`})
  }
  catch (error) {
    console.log(error.message);
    res.status(400).json({status: "error", error: error.message})
  }
}
//Function that will fetch the weather history of a selected date, based on location. Will return the 24 hour weather
const getWeatherHistory = async (req, res) => {
  const date = req.query.date;
  const location = req.query.location;
  try {
    const history = await axios.get('http://api.weatherapi.com/v1/history.json', {
      params: {
        key: process.env.WEATHERAPI_KEY,
        q: location,
        dt: date,
      }
    })
    res.status(200).json({status : 200, date, location, data: history.data})
  } catch (error) {
      console.log(error.message);
      res.status(400).json({status: "error", error: error.message})
  }
}

// const searchLocation = async (req, res) => {
//   const location = req.query.location;
//   try {
//     const searchArray = await axios.get('http://api.weatherapi.com/v1/search.json', {
//       params: {
//         key: process.env.WEATHERAPI_KEY,
//         q: location,
//       }
//     })
//     res.status(200).json({status: 200, data: searchArray})
//   } catch (error) {
//       console.log(error);
//       res.status(400).json({status: 'error', error: error});
//   }
// } //searchLocation
module.exports = { getCurrentWeather, getWeatherHistory };
//IN THIS FORMAT, data.data returns an object in the following format: (e.g. for the q: "Montreal" param, specifically)
/*
{
  location: {
    name: 'Montreal', 
    region: 'Quebec', 
    country: 'Canada',
    lat: 45.5,        
    lon: -73.58,      
    tz_id: 'America/Toronto',
    localtime_epoch: 1661541462,
    localtime: '2022-08-26 15:17'
  },
  current: {
    last_updated_epoch: 1661541300,
    last_updated: '2022-08-26 15:15',
    temp_c: 20,
    temp_f: 68,
    is_day: 1,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003
    },
    wind_mph: 9.4,
    wind_kph: 15.1,
    wind_degree: 20,
    wind_dir: 'NNE',
    pressure_mb: 1011,
    pressure_in: 29.86,
    precip_mm: 1,
    precip_in: 0.04,
    humidity: 78,
    cloud: 75,
    feelslike_c: 20,
    feelslike_f: 68,
    vis_km: 32,
    vis_miles: 19,
    uv: 3,
    gust_mph: 9.8,
    gust_kph: 15.8
  }
}
*/
// axios.get('http://api.weatherapi.com/v1',{
//   key: WEATHERAPI_KEY,
//   q: 'Montreal',
// })
// .then((res) => {
//   console.log(res);
// })
// .catch ((err) =>{
//   console.log(err);
// });

// app.get('http://api.weatherapi.com/v1',)
// const getWeather = () =>{
//   fetch('http://api.weatherapi.com/v1', {
//     key: WEATHERAPI_KEY,
//     q: 'Montreal'
//   })
//   .then(res => {
//       return (JSON.stringify(res))
//   })
//   .catch((error) => {
//     return (error)
//   })
// }

// getWeather().then((res) => console.log(res))