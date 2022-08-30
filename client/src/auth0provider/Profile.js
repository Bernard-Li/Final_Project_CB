import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import GlobalStyles from "../components/GlobalStyles";

//This function build the profile page once a user logs in. Details like account icon, profile name and email are displayed onto the profile page
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  //Will conditionally render based on Auth0 state
  
  console.log(user);
  //referrerPolicy was preventing the loading of google account images. No-referrer property allowed the icons to be fetched from google icon URL
  return (
    <Wrapper>
    <GlobalStyles />
    { isAuthenticated ? 
      <div>
        <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Add user preferences and settings here</p>
      </div>
      :
      <div>
        <h1>You must be logged in to view this page!</h1>
      </div>
    }
    </Wrapper>
  )
};

export default Profile;

const Wrapper = styled.div`
`