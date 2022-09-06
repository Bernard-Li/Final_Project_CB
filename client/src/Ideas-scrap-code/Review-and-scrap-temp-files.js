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