import { useEffect, useState } from "react";
import styled from "styled-components";

//This component will fetch the data received from the api call to Weather_API in the backend
//The goal is to store a 'snapshot' of the current weather (for future reference) 
//when the user creates a a quick log => travel card.
const Weather = () =>{
  //loading state to allow the rendering of the weather below. Fetch from frontend => backend => api
  const [ loading, setLoading ] = useState(false);
  const [refreshBtn, setRefreshBtn ] = useState(false);
  //use an object called currentWeather to store the information
  const [ currentWeatherObject, setCurrentWeatherObject ] = useState(null);
  //function to avoid API call every single time the homepage is refreshed. Will only update the weather information onClick
  
  //fetching the api call data from the back-end
  useEffect(() =>{
    // fetch(`/currentweather`)
    // .then(res => res.json())
    // .then(data =>{
    //   //reducing the amount of repeated data.data writing, precising which object key to access in returned response
    //   const currentWeather = data.data.current;
    //   const condition = data.data.current.condition;
    //   const location = data.data.location;
    //   console.log(currentWeather);
    //   setCurrentWeatherObject({...currentWeather, 
    //     condition: condition.text,
    //     conditionIcon: condition.icon,
    //     temperatureC: currentWeather.feelslike,
    //     windSpeed: currentWeather.wind_kph,
    //     windDir: currentWeather.wind_dir,
    //     precipitation: currentWeather.precip_mm,
    //     humidity: currentWeather.humidity,
    //     pressure: currentWeather.pressure_mb,
    //     uv: currentWeather.uv,
    //     city: location.name,
    //     region: location.region,
    //     country: location.country,
    //     localTime: location.locationTime,
    //     lastUpdate: currentWeather.last_updated,  
    //   })
    //   setLoading(true);
    // })
    // console.log('mimic data weather fetching here...')
  },[refreshBtn])
  
  return (
    <>
      { loading ?
      <WeatherContainer>
        <p>Weather here*</p>
        <div>
          <p>{currentWeatherObject.condition}</p>
          <img alt='weather icon' src={currentWeatherObject.conditionIcon} />
          <p>{currentWeatherObject.lastUpdate}</p>
        </div>
        <button onClick={() => {
        setRefreshBtn(prevCheck => !prevCheck)
        console.log(refreshBtn)}
        }>Refresh</button>
      </WeatherContainer>
        :
        <>
        <p>Weather widget palceholder</p>
        <button onClick={() => {
        setRefreshBtn(prevCheck => !prevCheck)
        console.log(refreshBtn)}
        }>Refresh</button>
        </>
      }
    </>
  )
}
export default Weather;

const WeatherContainer = styled.div``