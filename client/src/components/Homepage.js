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
    if(!user){
      fetch(`/api/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      }
    })
    // console.log(`user is : ${user}`);
  }
  //***REMOVE**** 
  else if(user) {
      console.log('profile is mounted to db, in login');
    }
  //to be removed after final pass ^
  }, [])

  return (
    <>
    { isAuthenticated ?
    //everything in the 'true' part of the ternary operator is what the user sees after being authenticated
    <Wrapper>
      <h2>Welcome, {user.name}!</h2>
      <NavLink to="/quicklog">
        <button>Quick Log</button>
      </NavLink>
      <NavLink to="/travelcard">
        <button>Travel Card</button>
      </NavLink>

      <Weather />
    </Wrapper>
      :
    //everything below this statement is the default homepage
      <h2> This is the homepage palceholder </h2>
    }
    </>
  )
}

export default Homepage;

const Wrapper = styled.div`

button {
  padding: 10px;
}
`