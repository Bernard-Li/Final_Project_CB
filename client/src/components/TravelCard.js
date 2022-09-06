import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//Component used to show the full detailed traveled card, directed from the modal preview of each card on the summary list
//This is the first time the uploaded image (if applicable) will be shown back to the user from the Cloudinary API.
//STRETCH if time: allow the user to upload or delete their card from this page
const TravelCard = () => {
  const moment = require('moment');
  const location = useLocation();
  const [weatherHistory, setWeatherHistory] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  //represents the card that was sent with useNavigation from the modal "view full card"
  const userCard = location.state.travelCard;
  
  const createdOn = () => {
    const uploadDate = new Date(userCard.data.created);
    return moment(uploadDate).format('dddd MMMM Do, YYYY');
  }
  //function that elaborates the date to show day of the week, month, day and year in full strings
  const dateToText = () => {
    const start = new Date(userCard.data.date[0][0]);
    const finish = new Date(userCard.data.date[0][1]);
    const textDateStart = (moment(start).format('dddd MMMM Do, YYYY'));
    //Modifies the displayed dates if there is only one day e.g. single day trip
    if(userCard.data.date[0][0] !== userCard.data.date[0][1]){
      const textDateEnd = (moment(finish).format('dddd MMMM Do, YYYY'));
      return (
        <>
          <p>Start Date: {textDateStart}</p>
          <p>End Date: {textDateEnd}</p>
        </>
      );
    }
    else {
      return ( <p>Start Date: {textDateStart}</p> );
    }
  }
  //Gets the weather on the day of the travel (using first day as reference only), goal is a gentle reminder of the conditions (easy to forget a few months later)
  //Fetches from weather API
  useEffect(() => {
    const getWeatherHistory = async () => {
      if(userCard.data.nearestCity){
        try {
          await fetch(`/api/getWeatherHistory/?location=${userCard.data.nearestCity}&date=${userCard.data.date[0][0]}`)
          .then(res => res.json())
          .then(async (data) => {
            console.log(data);
            const weatherObject = await data.data.forecast.forecastday[0].day;
            setWeatherHistory(weatherObject);
            console.log(weatherObject);
            setWeatherDisplay(true);
          })
        } catch (error) {
            console.log(error);
            return (
              <>
                <h4>Error occured with the weather history!</h4>
              </>
            )
        }
      }
    }
    getWeatherHistory();
  },[])

  //Gets the current weather of the location
  useEffect(() => {
    const getCurrentWeather = async () => {
      if(userCard.data.nearestCity) {
        try {
          await fetch(`/api/currentweather/?local=${userCard.data.nearestCity}`)
          .then(res => res.json())
          .then(async (data) => {
            console.log(data);
            const currentWeather = await data;
            setCurrentWeather(currentWeather);
          })
        } catch (error) {
            console.log(error);
            return (
              <>
                <h4>Error occured with the weather history!</h4>
              </>
            )
        }        
      }
    }
    getCurrentWeather();
  },[])

  return (
    <Wrapper>
    <GlobalStyles />
    <Container className="container-div">
      <h1>{userCard.data.destination}</h1>
      <div className="travel-date-div">{dateToText()}</div>
      { !(userCard.media === 'no-media-selected') &&
      <ImageContainer alt='personal user uploaded file' src={userCard.media}/>
      }
      <div className="activity-div">
      <p>Activity: {userCard.data.activity}</p>
      </div>
      <p>Notes: {userCard.data.notes}</p>
      { weatherDisplay &&
      <div className="weather-container">
        <h3>Weather on the first day of travel</h3>
        <span>{weatherHistory.condition.text}</span>
        <img alt='forecast visual representation' src={weatherHistory.condition.icon}></img>
        <p>High of: {weatherHistory.maxtemp_c} C°</p>
        <p>Low of: {weatherHistory.mintemp_c} C°</p>
        <p>Humidy of: {weatherHistory.avghumidity} %</p>
      </div>
      }
      { currentWeather &&
        <div className="weather-container">
        <h3>Current weather</h3>
        <span>{currentWeather.data.current.condition.text}</span>
        <img alt='forecast visual representation' src={currentWeather.data.current.condition.icon}></img>
        <p>Feels like: {currentWeather.data.current.feelslike_c} C°</p>
        <p>Rain: {currentWeather.data.current.precip_mm} mm</p>
        <p>Humidy of: {currentWeather.data.current.humidity} %</p>
        </div>
      }
      <p>Card created on: {createdOn()}</p>
    </Container>
    </Wrapper>
  )
}
export default TravelCard;

const Wrapper = styled.div`
display: flex;
justify-content: center;
margin: 10px;

.activity-div {
  margin: 10px;
}
.weather-container {
  padding: 10px;
}`

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 75px;
max-width: 375px;
margin-bottom: 75px;`

const ImageContainer = styled.img`
display: flex;
height: auto;
width: 375px;`