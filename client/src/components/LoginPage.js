import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import LoginButton from "../auth0provider/login";
import styled from "styled-components";

//This function will render the homepage based on which user is logged in
const Homepage = () =>{
  //Taking the required values from Auth0, primarily useful to show the object 'user' which contains all the pertinent information 
  const { user, isAuthenticated } = useAuth0();
  //Hardcoded user to allow the rest of the code to work - Commented out Aug 29 2022 -13h22. Auth0 Google authenticator was non-responsive today
  // const user = {
  //   name: 'Hardcoded User',
  //   data: 'useAuth0 not authenticated'
  // }

  //POST method used to send the logged in user data to the back-end. Verification of new vs existing user will be dealth with in handlers of server.
  //email will the be used to check if they are already stored in the database.
  useEffect(() => {
    
      fetch(`/api/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      }
    })
  }, [isAuthenticated])

  return (
    <Wrapper>
    <>
      <h1>Welcome to Swivy!</h1>
      <p>🌍 Please login using google 🌍 </p>
      <div className="login-btn">
        <LoginButton />
      </div>
    </>
    { isAuthenticated &&
    <>
      <h1>Welcome, {user.name}!</h1>
      <p>🌍 Thank you for using Swivy! 🌍 </p>
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

h1 {
  margin: 80px 80px 0 80px;
}
button {
  padding: 10px;
  
}
`