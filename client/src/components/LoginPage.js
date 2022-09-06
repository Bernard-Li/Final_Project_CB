import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LoginButton from "../auth0provider/login";
import styled from "styled-components";

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
          <h4>Login with your google account and start logging your travels today!</h4>
        </div>
          <div className="login-btn">
            <LoginButton />
          </div>
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
  margin: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-div {
  margin: 10px;
}
button {
  padding: 10px;
}`