import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { GiMountaintop, GiFeather} from "react-icons/gi"

import DashboardBtn from "./DashboardBtn";

//A component that renders the navigation bar, displaying the name of the app and storing the log in / log out buttons. Also has links to Home and Profile, Swivy clickable to /travelcardcreate route
const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <Wrapper>
    <GlobalStyles />
      <div className="nav-dropdown">
        <DashboardBtn />
        <AppTitle>
          Swivy
        </AppTitle>
      </div>
      {/* <div>
        <button 
          className="home-btn"
          onClick={() => navigate('/')}>
            <GiMountaintop />
            <span 
              className="span-text">
                Home
            </span>
        </button>
      </div>
      <button
        className="profile-btn"
        onClick={() => navigate('/profile')}>
        <GiFeather />
        <span className="span-text">Profile</span>
      </button> */}
    </Wrapper>
  )
}
export default NavigationBar;

const AppTitle = styled.div`
@media screen and (max-width: 600px){
  display: none;
}
color: black;
font-size: 46px;
font-weight: bolder;
font-family: 'Dancing Script', cursive;
/* font-family: 'Mr Dafoe', cursive; */
//font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif` //DANCING SCRIPT, GOOGLE


const Wrapper = styled.div`
display: flex;
flex-direction: flex-start;
/* background-color: #071013; */
/* background-color: transparent; */
padding: 10px;
max-height: var(--max-height);
/* z-index: 100 !important; */
/* .swivy-btn {
  border: none;
  background-color: #071013;
  font-size: 20px;
  color: white;
} */
.nav-dropdown {
  display: flex;
  /* background-color: var(--color-black-blue); */
  gap: 10px;
}
.menu-btn {
    /* &:hover {
      background-color: var(--color-main-opal);
      cursor: pointer;
    } */
  }
.span-text {
  margin-left: 5px;
}
.home-btn {
  color: white;
  width: 88px;
}
.profile-btn {
  color: white;
  width: 88px;
}`