//couldImage is the array that will contain all uploaded images, known as "files"
    //cloudImage[0] represents an object that contains the uploaded image (single file uploading)
    // console.log(cloudImage[0]); 


/* console.log('data = ' + date)
      const localTime = moment().format("YYYY-MM-DD");
          const proposedDate = date;
          const isValid = moment(proposedDate).toString();
           */


        //   const dateArray = card.data.date;
        
        //   const convertedDates = dateArray.map((date) => {
        //     date.map((convertDate) => {
        //       {/* console.log(convertDate); */}
        //       const d = new Date(convertDate.slice(0, -1));
        //       console.log(d);
        //       return d;
        //     })
            
        //   })



/* GET METHODS cannot have body's */
//          ^^^^^^^^^^^^^^^^^^^
         // //this function will fetch the weather of the first day of the trip and display the average weather of the journey
  // useEffect(() => {
  //   const showWeather = async (date, location) => {
  //     try {
  //       await fetch(`/api/getWeatherHistory`,
  //       { method: 'GET', 
  //         body: JSON.stringify({ location: 'hardcoded city'}),
  //         headers: {
  //           'Content-type' : 'application/json'
  //         }
  //       })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data);
  //       })
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   // showWeather();
  // }, [])
          
/*  belongs to travel card, old data display on the travelcardcreate page
  <div className="weather-div">
  { forecastInfo ?
  <>
    <p>Forecast at trip start</p>
    <p>Average Temp: {forecastInfo.avgtemp_c}C </p>
    <p>Average humidity: {forecastInfo.avghumidity}%</p>
    <p>Highest Temp: {forecastInfo.maxtemp_c}C</p>
    <p>Lowest Temp: {forecastInfo.mintemp_c}C</p>
  </>
    :
    <p>Use a valid date on or before today!</p>
  }
  </div>
          */

  //This function will fetch the weather of the first day of the trip and display the average weather of the journey
  // useEffect(() => {
  //   const showWeather = async (date, location) => {
  //     if(date && location){
  //       try {
  //         await fetch(`/api/getWeatherHistory/${date}/${location}`)      //convert to query
  //         .then(res => res.json())
  //         .then(data => {
  //           setForecastInfo(data.data.forecast.forecastday[0].day);
  //           // setFormInput({...formInput, forecast: forecastInfo})
  //         })
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }
  //   if(dateRange.length > 1) {
  //     showWeather(formInput.dateTraveled[0], locationPrecision);
  //   }
  // }, [locationPrecision])

  //Expired trail for weatherapi.com

    //Gets the weather on the day of the travel (using first day as reference only), goal is a gentle reminder of the conditions (easy to forget a few months later)
  //Fetches from weather API
  // useEffect(() => {
  //   const getWeatherHistory = async () => {
  //     if(userCard.data.nearestCity){
  //       try {
  //         await fetch(`/api/getWeatherHistory/?location=${userCard.data.nearestCity}&date=${userCard.data.date[0][0]}`)
  //         .then(res => res.json())
  //         .then(async (data) => {
  //           const weatherObject = await data.data.forecast.forecastday[0].day;
  //           setWeatherHistory(weatherObject);
  //           setWeatherDisplay(true);
  //         })
  //       } catch (error) {
  //           console.log(error);
  //           return (
  //             <>
  //               <h4>Error occured with the weather history!</h4>
  //             </>
  //           )
  //       }
  //     }
  //   }
  //   getWeatherHistory();
  // },[])

  //Gets the current weather of the location
  // useEffect(() => {
  //   const getCurrentWeather = async () => {
  //     if(userCard.data.nearestCity) {
  //       try {
  //         await fetch(`/api/currentweather/?local=${userCard.data.nearestCity}`)
  //         .then(res => res.json())
  //         .then(async (data) => {
  //           console.log(data);
  //           const currentWeather = await data;
  //           setCurrentWeather(currentWeather);
  //         })
  //       } catch (error) {
  //           console.log(error);
  //           return (
  //             <>
  //               <h4>Error occured with the weather history!</h4>
  //             </>
  //           )
  //       }        
  //     }
  //   }
  //   getCurrentWeather();
  // },[])



  //Removed modal from travel card summary - instead take direct link
//   <>
//   { //The modal will have conditional rendering based on the information or lack of information the user chooses to store in their card
//     modal &&
//   <ModalDiv>
//     <div className="modal"></div>
//       <div className="overlay"
//         onClick={toggleModal}></div>
//       <div className="modal-content">
//         <h2>{currentCard.data.destination}</h2>
//         { currentCard.data.activity !== 'None selected' &&
//         <p><span>Activity</span>: {currentCard.data.activity}</p>
//         }
//         <p><span>Arrival date:</span> {
//           currentCard.data.date[0][0]
//           }</p>
//         <p><span>Duration of trip:</span> {tripDuration()}</p>
//         { currentCard.data.notes &&
//         <p className="paratag-notes"><span>Notes:</span> {currentCard.data.notes}</p>
//         }
//         <button
//           className="fullcard-btn"
//           onClick={() => navigate('/viewtravelcard', {state: {travelCard: currentCard}})} 
//           >View full card</button>
//       </div>
//       <button className="close-modal"
//         onClick={toggleModal}> X </button>
//   </ModalDiv>
//   }
// </>
  //Removed modal styled.components
  /* MODAL CSS */
// const ModalDiv = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// span {
//   font-weight: bold;
// }
// .paratag-notes {
//   @media screen and (max-width: 375px) {
//     min-width: 50px;  
//     max-width: 325px;
//   }
// }
// .fullcard-btn {
//   color: white;
//   margin: 10px;
// }
// body.active-modal {
//     overflow-y: hidden;
// }
// .modal, .overlay {
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   position: fixed;
// }
// .overlay {
//   background: rgba(49,49,49,0.8);
// }
// .modal-content {
//   position: absolute;
//   color: var(--color-font-color);
//   top: 40%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   line-height: 1.4;
//   background: var(--color-main-opal);
//   padding: 14px 28px 14px 28px;
//   border-radius: 8px;
//   max-width: 600px;
//   @media screen and (max-width: 425px) {
//     max-width: 250px;
//   }
//   @media screen and (max-width: 667px){
//     min-width: 350px;
//   }
//   min-width: 550px;
// }
// .close-modal {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   padding: 5px 7px;
//   color: white;
// }
// .btn-modal {
//   padding: 10px 20px;
//   display: block;
//   margin: 100px auto 0;
//   font-size: 18px;
// }`
