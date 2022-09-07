import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LoginButton from "../auth0provider/login";
import styled from "styled-components";
import ImageSliderBar from "./ImageSliderBar";
import { ImageSlideData } from "./ExampleImages";
import Footer from "./Footer";


//This component will render the homepage based on which user is logged in (a.k.a login page as the default when the user navigates to the '/' for the first time)
const Homepage = () =>{
  //Taking the required values from Auth0, primarily useful to show the object 'user' which contains all the pertinent information 
  const { user, isAuthenticated } = useAuth0();

  //POST method used to send the logged in user data to the back-end. Verification of new vs existing user will be dealth with in handlers of server.
  //email will the be used to check if they are already stored in the database.
  useEffect(() => {
    if(user){
      fetch(`/api/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      }
    })  
  }
}, [isAuthenticated])

  return (
    <Wrapper>
      { !user &&
        <>
        <div className="title-div">
          <h1>Welcome</h1>
        </div>
        <div className="text-div"> 
          <p>Click the button below to login with your google account</p>
          {/* <h4>Quicky and easy to use on the go: </h4> */}
        </div>
          <div className="login-btn">
            <LoginButton />
          </div>
          <div className="slidebar-div">
          <ImageSliderBar slides={ImageSlideData}/>
          </div>
          <Footer />
        </>
      }
      { isAuthenticated &&
        <>
          {/* Calls this entire component 'LoginPage' to make the post request with valid user info */}
        </>
      }
    </Wrapper>
  )
}

export default Homepage;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.title-div {
  margin: 65px 65px 0 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-div {
  display: flex;
  flex-direction: column;
  margin: 10px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 440px) {
    max-width: 255px;
  }
}
button {
  padding: 10px;
  border: 2px solid var(--color-font-color);
  color: white;
  margin: 10px;
}

.slidebar-div {
  margin-top: 36px;
}

.example-img1 {
  /* transform: rotate(45deg); */
  width: 300px;
  height: auto;
  border: 1px solid var(--color-font-color);
}`