import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./userContext";
//Import from an NPM packagee called react-datepicker @https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* Main feature of the website: 
The following function will allow the user to store pertinent 
information about their trip, and send the form to the database.

This page also handles the image upload to the Cloudinary API. The database will receive the image URL in the backend handlers,
and the POST method here will send the actual file (image e.g. jpeg, png, etc.) to the Cloudinary Database.
The folder is named "Swivy_uploads" and it stored under the upload_presets in MY cloudinary account. Limit 1GB of storage - free version
*/

/*  IMPORTANT : the upload image button used for testing the image path - backend-cloudinary and mongoDB.
    CHANGE: will replace the upload photo button to 'Submit QuickLog', handle submit function will take the
    uploaded image AND form data and send it to the backend => towards mongoDB
*/

const TravelCardCreate = () => {
  //useAuth0 to determine which user is logged in  
  //formInput is a state that will store the user selected date in the input form below
  //previewSource will store a base64 encoded version of the image the user uploads
  
  const { user } = useAuth0();
  const dateCreated = new Date(); 
  //used to format date passed back by the datepicker into more legible data
  const moment = require('moment');

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [formInput, setFormInput] = useState({
    destination: null,
    dateCreated: dateCreated, //date that the card was created - filter purposes
    dateTraveled: null, //will use the date that user is uploading as the default date for the trip, assuming they are creating the card while on the trip
    forecast: null,
    activity: 'None selected',
  })
  const [fileState, setFileState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  //Function that will set the state file to the uploaded image, on change from the input field in the form below
  //userImage will an object from the files array that contains key-value pairs providing information of the upload that the user made
  //We want to: store the image into cloudinary, assign it a value to the backend as well ***** through what type of identifier?
  const handleChange = (e) => {
    const userImage = e.target.files[0];
    previewFile(userImage);
    setFileState(e.target.value);
    
  }
  //function that accept the selected date range from the form and return the format: year-month-day
  const handleConversion = (date) => {
    const validateArray = date.every((value) => { //this function checks the state of date, and once two dates are picked, it will run the conversion. 
      return value;
    })
    if(validateArray){
      const convertedArray = date.map((date) =>{
        console.log(date);
        const d = new Date(date);
        const formatedDate = moment(d);
        const returnDate = formatedDate.format("YYYY-MM-DD");
        return returnDate;
      })
      setFormInput({...formInput, dateTraveled: convertedArray}); //stores the newly converted array of 2 'string' dates into the formInput, to be sent to the database.
    }
  }
  //Function that will allow the user to view the image preview before submitting it to cloudinary/their account travel card
  //Convert the choosen file into a string -base64 encoding and store the encoded image into the state previewSource
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setPreviewSource(reader.result);
        
    }
  }
  //Function that will handle the final submission of the image, form submission. If no image is selected to be preview, do not trigger the upload image function 
  //**CHANGE THIS** \\
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadTravelCard(previewSource);
    // if(!previewSource){
    //   console.log('no image selected');
    // }
    // else {
    //   uploadTravelCard(previewSource);
    // }
  }
  //function that will take the encodedImage, formInput state and the user => POST to the backend
  const uploadTravelCard = async (encodedImage) =>{
    try {
      await fetch('/api/upload-quicklog', {
        method: 'POST',
        body: JSON.stringify({ data: encodedImage, user: user, form: formInput}),
        headers: {
          'Content-type' : 'application/json'
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Wrapper>
      <h1>This page is a travel card creation page</h1>
      <form onSubmit={handleSubmit}>
        <input className='form-input'
          type='file'
          value={fileState}
            onChange={handleChange}>
        </input>
        <label
          className='label-destiantion'>Destination
          <input
            type='text'
            className='destination-input' 
            placeholder='Enter a destination here'
            onChange={(e) => {
              setFormInput({...formInput, destination: e.target.value})
              }}
              ></input>
        </label>
        <label 
          className='label-date'>
          Date
            <DatePicker
              className='date-picker' 
              closeOnScroll={true}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                handleConversion(update);
                setDateRange(update);
                  }
                }
              isClearable={true}
                />
        </label>

          <select onChange={(e) => {
              setFormInput({...formInput, activity: e.target.value})
              }}>
            <option value='None selected'>-Activity-</option>
            <option value='Hiking'>Hiking</option>
            <option value='Hiking'>Hiking</option>
            <option value='Hiking'>Hiking</option>
            <option value='Hiking'>Hiking</option>

          </select>
        <button className='upload-btn' 
          type='submit'>
          Create Card
        </button>
      </form>
      {previewSource &&
        <img className='preview-img' alt='previewed user upload' src={previewSource} />
      }
    </Wrapper>
  )
}

export default TravelCardCreate;

const Wrapper = styled.div`
display: flex;
flex-direction: column;

.preview-img {
  height: auto;
  width: 100vw;
}
`