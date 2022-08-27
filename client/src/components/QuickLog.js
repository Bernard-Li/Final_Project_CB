import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const QuickLog = () => {
  
  const [cloudImage, setCloudImage] = useState(null);

  const onUpload = () =>{
    //couldImage is the array that will contain all uploaded images, known as "files"
    //cloudImage[0] represents an object that contains the uploaded image (single file uploading)
    console.log(cloudImage[0]); 

    //store the image into cloudinary, assign it a value to the backend as well
  }

  return (
    <>
      <h1> Quicklog page, placehodler </h1>
      <input 
        type='file'
          onChange={(e) => {
              setCloudImage(e.target.files);
            } 
          }></input>
      <button
        onClick={onUpload}>
          Click here to 'upload'
      </button>
    </>
  )
}

export default QuickLog;