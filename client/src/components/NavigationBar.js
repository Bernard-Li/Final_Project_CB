import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

//A function that renders the navigation bar, displaying the name of the app and storing the log in / log out buttons. Also has links to Home and Profile - TEMP 
const NavigationBar = () => {
  return (
    <Wrapper>
    <GlobalStyles />
      <h2>Swivy</h2>
      {/* <LoginButton /> */ //Moved to the center of the login page
      }
      {/* <LogoutButton /> */ //Moved to Footer
      }   
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/profile"> 
        Profile
      </NavLink>
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


`