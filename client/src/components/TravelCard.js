import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Component used to show the full detailed traveled card, directed from the modal preview of each card on the summary list
//This is the first time the uploaded image (if applicable) will be shown back to the user from the Cloudinary API.
//STRETCH if time: allow the user to upload or delete their card from this page
const TravelCard = () => {
  const moment = require('moment');
  const location = useLocation();
  let navigate = useNavigate();
  const [weatherHistory, setWeatherHistory] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [travelCardId, setTravelCardId] = useState(null);
  //represents the card that was sent with useNavigation from the modal "view full card"
  const userCard = location.state.travelCard;
    
  //Function that will show the date on which the card was created, in an expanded format using moment
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
          <p><span>Start Date:</span> {textDateStart}</p>
          <p><span>End Date:</span> {textDateEnd}</p>
        </>
      );
    }
    else {
      return ( <p><span>Start Date</span>: {textDateStart}</p> );
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
            const weatherObject = await data.data.forecast.forecastday[0].day;
            setWeatherHistory(weatherObject);
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
  //Function that will handle deleting the card. It will send the _id of the card to the endpoint in the backend
  //It will also prompt the user to make sure that they actually want to delete their card. 
  //Entering anything but the string yes will refresh the page and do nothing. DELETE fetch will only trigger with correct confirmation
  //Redirect to homepage after task is completed.
  useEffect(() => {
    if(travelCardId){
      const answer = prompt('Are you sure you want to delete this card? -yes/no-');
      if(answer){
        if(answer.toLowerCase() === 'yes'){
          try {
            fetch(`/api/delete-card/${travelCardId}`, {
              method: 'DELETE',
              headers: {
                'Content-type' : 'application/json'
              }
            })
            .then(res => res.json())
            .then(data => {
              if(data.status === 200){
                alert('Card successfully deleted! Redirecting to homepage');
                navigate('/');
              }
            })
          } catch (error) {
              console.log(error);
              return (
                <>
                  <p>Unable to delete card. Try again</p>
                </>
              )
          }
        }
        else if(answer.toLowerCase() === 'no') {
          window.location.reload();
        }
        else {
          alert('Answer invalid');
          window.location.reload();
        }
      }
      else {
        //changes the state from storing the _id of the card to null value, which will allow the button to be clicked again
        setTravelCardId(null);
      }
    }
    
  }, [travelCardId])

  //Conditional rendering of HTML tags depending on whether or not the information was registered by the user
  //The two mandatory field are the destination and travel date(s). Everything else is going to be option 
  return (
    <Wrapper>
    <GlobalStyles />
    <Container className="container-div">
      <h1>{userCard.data.destination}</h1>
      <div className="travel-date-div">{dateToText()}</div>
      { !(userCard.media === 'no-media-selected') &&
      <ImageContainer src={userCard.media}/>
      }
      <div className="activity-div">
      <p><span>Activity</span>: {userCard.data.activity}</p>
      </div>
      <div className="notes-div">
      { userCard.data.notes &&
      <p><span>Notes</span>: {userCard.data.notes}</p>
      }
      </div>
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
        <h3>Current weather in {currentWeather.data.location.name}, {currentWeather.data.location.country} *</h3>
        <span>{currentWeather.data.current.condition.text}</span>
        <img alt='forecast visual representation' src={currentWeather.data.current.condition.icon}></img>
        <p>Feels like: {currentWeather.data.current.feelslike_c} C°</p>
        <p>Rain: {currentWeather.data.current.precip_mm} mm</p>
        <p>Humidy of: {currentWeather.data.current.humidity} %</p>
        </div>
      }
      <p><span>Card created on</span>: {createdOn()}</p>
      <button
        className="delete-btn"
        onClick={() => setTravelCardId(userCard._id)}>
        Delete card
      </button>
      { currentWeather &&
      <div className="linkto-weatherapi">
      <p>*Weather data supplied by <a href='https://www.weatherapi.com/'>www.weatherapi.com</a> based on nearest city.</p>
      </div>

      }
    </Container>
    </Wrapper>
  )
}
export default TravelCard;

const Wrapper = styled.div`

display: flex;
justify-content: center;
margin: 10px;
span {
  font-weight: bold;
}
.activity-div {
  margin: 10px;
}
.notes-div {
  margin: 10px;
}
.weather-container {
  padding: 10px;
  min-width: 285px;
}
.delete-btn {
  color: white;
  margin-top: 10px;
  border: 2px solid var(--color-font-color);
}

.linkto-weatherapi {
  margin: 10px;
  font-size: 12px;
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