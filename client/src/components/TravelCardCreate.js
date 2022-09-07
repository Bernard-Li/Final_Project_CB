import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
//Import from an NPM packagee called react-datepicker @https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();
  const { user } = useAuth0();
  const dateCreated = new Date(); 

  //used to format date passed back by the datepicker into more legible data
  const moment = require('moment');

  //Declare states needed to store information from the fetch and datepicker
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;

  const [isDisabled, setIsDisabled] = useState(false);
  const [otherActivity, setOtherActivity] = useState(false);

  //Final state object that will be passed to the backend, and stored in mongoDB
  const [formInput, setFormInput] = useState({
    destination: null,
    dateCreated: dateCreated, 
    dateTraveled: dateCreated, //default date is the date of creation
    activity: 'None selected',
    notes: null,
    nearestCity: null,
  })
  const [fileState, setFileState] = useState('');
  const [previewSource, setPreviewSource] = useState(null);

  //Function that will set the state file to the uploaded image, on change from the input field in the form below
  //userImage will an object from the files array that contains key-value pairs providing information of the upload that the user made
  //We want to: store the image into cloudinary, assign it a value to the backend as well ***** through what type of identifier?
  const handleChange = (e) => {
    const userImage = e.target.files[0];
    previewFile(userImage);
    setFileState(e.target.value);
  }
  //Function that will allow the user to add their own activity if the pre decided choices do not fit , option -other-
  const handleActivity = (e) => {
    if(e.target.value === 'Other'){
      setOtherActivity(true);
    }
    else {
      setOtherActivity(false);
      setFormInput({...formInput, activity: e.target.value})
    }
  }

  //Function that accepts the selected date range from the form and return the format: year-month-day
  const handleConversion = (date) => {
    const validateArray = date.every((value) => { //this function checks the state of date, and once two dates are picked, it will run the conversion. 
      return value;
    })
    if(validateArray){
      const convertedArray = date.map((date) =>{
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
    //BUG, if clicked outside of the file explorer when choosing a file to upload, function will try to read null value of file, crashing the website
    //truthy check prevents readAsDataURL from running until a file is uploaded.
    if(file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      }
    }
  }

  //Function that will handle the final submission of the form by calling the function containing the POST method (form onSubmit has handleSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadTravelCard();
    setIsDisabled(true);
  }
    
  //Function that will take the encodedImage, formInput state and the user => POST to the backend
  const uploadTravelCard = async () =>{
    if(formInput.destination && formInput.dateTraveled){
      setIsDisabled(true);
    try {
        await fetch('/api/upload-travelcard', {
          method: 'POST',
          body: JSON.stringify({ data: previewSource, user: user, form: formInput}),
          headers: {
            'Content-type' : 'application/json'
          }
        })
        navigate('/');
      } catch (error) {
        console.log(`uploadTravelCard error = ${error}`);
      }
    }
    else {
      window.alert('Missing required information : Destination or Dates');
    }
  }

  return (
    <Wrapper>
      <h1>New Travel Card</h1>
      <span>* mandatory fields</span>
      <form 
        className='form'
        onSubmit={handleSubmit}>
      <div
        className='first-div'>
        <label
          className='label-destiantion'>Destination*
          <input
            type='text'
            className='destination-input' 
            placeholder='Enter your destination'
            required='required'
            onChange={(e) => {
              setFormInput({...formInput, destination: e.target.value})
              }}
              ></input>
        </label>
        </div>
        <div className='second-div'>
        <label 
          className='label-date'>
          Date*
            <DatePicker
              className='date-picker' 
              closeOnScroll={true}
              selectsRange={true}
              setStartDate={dateCreated}
              startDate={startDate}
              endDate={endDate}
              required='required'
              placeholderText="Select a date"
              onChange={(update) => {
                handleConversion(update);
                setDateRange(update);
                  }
                }
              isClearable={true}
                />
        </label>
        </div>
        <div className="select-drop">
        <label>
          Activity
        </label>
          <select 
            className="select-dropdown"
            // onChange={(e) => {
            //   setFormInput({...formInput, activity: e.target.value})
            //   }}
            onChange={handleActivity}
              >
            <option value='None selected'>-Select Activity-</option>
            <option value='Run & Fitness'>Run & Fitness</option>
            <option value='Bike Ride'>Bike Ride</option>
            <option value='Hiking'>Hiking</option>
            <option value='Ski or Snowboard'>Ski or Snowboard</option>
            <option value='Water'>Water</option>
            <option value='Climb'>Climb</option>
            <option value='Other'>Other</option>
          </select>
          { otherActivity &&
          <label>Other Activity 
          <div>
          <input
            className="input-other"
            placeholder="Enter activity name"
            type='text' 
            onChange={(e) => {
              setFormInput({...formInput, activity: e.target.value})
            }}
              ></input>
            </div>
            </label>
          }
        </div>
        <label>Upload an image
        <input className='form-input'
          type='file'
          value={fileState}
            onChange={handleChange}>
        </input>
        </label>
          <label>Notes
          <div className="text-input-div">
          <textarea
            className="text-area"
            placeholder="Add notes here"
            onChange={(e) => {
              setFormInput({...formInput, notes: e.target.value})
              }}
          />
          </div>
          </label>
        <label>Weather <span className="subtext-span">{'(city & country required for accurate forecast)'}</span>
          <div className="weather-field-input">
          <input
            type='text'
            className='weather-precision-input'
            placeholder='Enter city & country here'
            onChange={(e) => {
              setFormInput({...formInput, nearestCity: e.target.value});
            }}
            ></input>
            </div>
            </label>
      {/* Should be the last item on the page - Create Card button */}
        <div className="upload-btn-div">
        <button className='upload-btn' 
          type='submit'
          disabled={isDisabled}>
          {
            isDisabled ?
          'Generating Card...': 'Create Card'
          }
        </button>
        </div>
      </form>
      {previewSource &&
        <>
        <span className="image-label">Image preview below</span>
        <img className='preview-img' alt='previewed user upload' src={previewSource} />
        </>
      }
    </Wrapper>
  )
}

export default TravelCardCreate;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
margin-bottom: 50px;
h1 {
  margin: 80px 60px 0 80px;
}
.first-div .second-div {
  margin: 10px;
}
.subtext-span {
  font-size: small;
}
.destination-input {
  margin: 10px 0 10px 20px;
  min-width:  300px;
  
}
.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-end;
  margin: 10px;

}
.date-div {
  display: flex;
}
.select-drop .select-dropdown {
  display: flex;
  justify-content: flex-end;
  min-width: 150px;
  max-width: 300px;
  margin: 10px 0 10px 20px;
}
.date-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 20px;
  z-index: -1;
}
.form-input {
  margin: 10px 0 10px 20px;
}
.input-other {
  margin: 10px 0 10px 20px;
}
.upload-btn {
  color: white;
  width: 100%;
  border: 2px solid var(--color-font-color);
}
.text-input-div {
  margin: 10px 0 10px 20px;
}
.weather-precision-input {
  margin: 10px 0 10px 20px;
}
.weather-precision-input {
  width: 300px;
}
textarea {
  resize: none;
  width: 300px;
  height: 50px;
}
.image-label {
  margin: 10px;
}
  .preview-img {
    height: auto;
    max-width: 88vw;
}`

