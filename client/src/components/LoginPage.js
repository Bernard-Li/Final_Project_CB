import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Weather from "./Weather";

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
    //Prevents the fetch from running every single time the homepage component is rendered
    
      fetch(`/api/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      }
    })
  }, [user])

  return (
    <Wrapper>
    <>
      <h1>Welcome to Swivy!</h1>
      <p>🌍 Please login using google 🌍 </p>
    </>
    { isAuthenticated &&
    <>
      <h2>Welcome, {user.name}!</h2>
    </>
    }
    </Wrapper>
  )
}

export default Homepage;

const Wrapper = styled.div`

button {
  padding: 10px;
}
`