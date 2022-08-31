import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { GiMountaintop, GiFeather} from "react-icons/gi"

//A function that renders the navigation bar, displaying the name of the app and storing the log in / log out buttons. Also has links to Home and Profile - TEMP 
const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <Wrapper>
    <GlobalStyles />
      <h2>Swivy</h2>
      {/* <LoginButton /> */ //Moved to the center of the login page
      }
      {/* <LogoutButton /> */ //Moved to Footer
      }   
      <div>
      <button 
        className="home-btn"
        onClick={() => navigate('/')}>
          <GiMountaintop />
          <span className="span-text">Home</span>
      </button>
      {/* <NavLink to="/">
        <GiMountaintop />
        Home
      </NavLink> */}
      </div>
      <button
        className="profile-btn"
        onClick={() => navigate('/profile')}>
        <GiFeather />
        <span className="span-text">Profile</span>
      </button>
      {/* <NavLink to="/profile"> 
        Profile
      </NavLink> */}
    </Wrapper>
  )
}
export default NavigationBar;

const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
background-color: #071013;
/* background-color: transparent; */
padding: 10px;
max-height: var(--max-height);

.span-text {
  margin-left: 5px;
}
.home-btn {
  color: white;
  width: 80px;
}
.profile-btn {
  color: white;
  width: 80px;
}`