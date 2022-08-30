import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

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

const TravelCard = () => {
  //need to get the currently logged in user
  const { user } = useAuth0();
  // console.log(user);
  const [fileState, setFileState] = useState('');
  //previewSource will store a base64 encoded version of the image the user uploads
  const [previewSource, setPreviewSource] = useState('');
  //function that will set the state file to the uploaded image, on change from the input field in the form below
  const handleChange = (e) => {
    //userImage will an object from the files array that contains key-value pairs providing information of the upload that the user made
    const userImage = e.target.files[0];
    //we want to: store the image into cloudinary, assign it a value to the backend as well ***** through what type of identifier?
    previewFile(userImage);
    setFileState(e.target.value);
  }
  //function that will allow the user to view the image preview before submitting it to cloudinary/their account travel card
  const previewFile = (file) => {
    //convert the choosen file into a string -base64 encoding
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        //stores the encoded image into the state previewSource
        setPreviewSource(reader.result);
        
    }
  }
  //function that will handle the final submission of the image, form submission
  const handleSubmit = (e) => {
    // console.log(user);
    // console.log(previewSource);
    e.preventDefault();
    //if no image is selected to be preview, do not trigger the upload image function
    if(!previewSource){
      console.log('no image selected');
    }
    else {
      uploadImage(previewSource);
    }
  }
  //function that will take the encodedImage and POST to the backend
  const uploadImage = async (encodedImage) =>{
    // console.log(encodedImage);
    try {
      await fetch('/api/upload-quicklog', {
        method: 'POST',
        body: JSON.stringify({ data: encodedImage, user: user}),
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
      <h1> Quicklog page, placehodler </h1>
      <form onSubmit={handleSubmit}>
        <input className="form-input"
          type='file'
          value={fileState}
            onChange={handleChange}>
        </input>
        <button className="upload-btn" 
          type="submit">
          Upload image
        </button>
        <label>Trip Type</label>
          <select>
            <option>-Nature-</option>
          </select>
      </form>
      {previewSource &&
        <img className="preview-img" alt='previewed user upload' src={previewSource} />
      }
    </Wrapper>
  )
}

export default TravelCard;

const Wrapper = styled.div`
display: flex;
flex-direction: column;

.preview-img {
  height: auto;
  width: 100vw;
}
`