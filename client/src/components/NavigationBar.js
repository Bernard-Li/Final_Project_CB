import LoginButton from "../auth0provider/login";
import LogoutButton from "../auth0provider/logout";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
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
    </>
  )
}
export default NavigationBar;