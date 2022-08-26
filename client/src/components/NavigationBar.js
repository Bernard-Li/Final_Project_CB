import LoginButton from "../auth0provider/login";
import LogoutButton from "../auth0provider/logout";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  return (
    <Wrapper>
      <h2>Placeholder for navigation bar</h2>
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
`