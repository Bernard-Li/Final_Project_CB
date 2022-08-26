import LoginButton from "../auth0provider/login";
import LogoutButton from "../auth0provider/logout";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const NavigationBar = () => {
  return (
    <Wrapper>
    <GlobalStyles />
      <h2>Swivy</h2>
      <LoginButton />
      <LogoutButton />
      <NavLink to="/">
        Home
      </NavLink>
      {/* Placeholder profile link for now, will update to hold a username or ID corresponding to who has logged in */}
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
padding: 10px;
max-height: var(--max-height);
`