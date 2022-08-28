import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const QuickLog = () => {
  
  const [fileState, setFileState] = useState('');
  //previewSource will store a base64 encoded version of the image the user uploads
  const [previewSource, setPreviewSource] = useState('');
  const [cloudImage, setCloudImage] = useState('');
  //function that will set the state file to the uploaded image, on change from the input field in the form below
  const handleChange = (e) => {
    //userImage will an object from the files array that contains key-value pairs providing information of the upload that the user made
    const userImage = e.target.files[0];
    //we want to: store the image into cloudinary, assign it a value to the backend as well ***** through what type of identifier?
    previewFile(userImage);
    setCloudImage(userImage);
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
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: encodedImage}),
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
      </form>
      {previewSource &&
        <img className="preview-img" alt='previewed user upload' src={previewSource} />
      }
    </Wrapper>
  )
}

export default QuickLog;

const Wrapper = styled.div`
display: flex;
flex-direction: column;

.preview-img {
  height: auto;
  width: 100vw;
}
`