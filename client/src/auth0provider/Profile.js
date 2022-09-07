import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import Footer from "../components/Footer";

//This function build the profile page once a user logs in. Details like account icon, profile name and email are displayed onto the profile page
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  //Will conditionally render based on Auth0 state
  
  //referrerPolicy was preventing the loading of google account images. No-referrer property allowed the icons to be fetched from google icon URL
  return (
    <Wrapper>
    <GlobalStyles />
    { isAuthenticated ? 
    <>
      <div className="profile-div">
      <h1>My Profile</h1>
          <img className='user-icon' src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
        <div className="name-div">
          <h2>{user.name}</h2>
        </div>
        <div className="email-div">
        <p>{user.email}</p>
        </div>
      </div>
      <Footer />
      </>
      :
      <>
      <div className="no-user">
        <h2>Please login to view profile</h2>
      </div>
      <Footer />
      </>
    }
    </Wrapper>
  )
};

export default Profile;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: center;
h1 {
  margin: 80px;
}
.profile-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.user-icon {
  border-radius: 50px;
  max-height: 100px;
  max-width: 100px;
  margin: 80px 20px 20px 20px;
}
.no-user {
  margin: 300px 10px;
}
`