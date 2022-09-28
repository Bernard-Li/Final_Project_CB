import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import DashboardBtn from "./DashboardBtn";

//A component that renders the navigation bar, displaying the name of the app and storing the log in / log out buttons. Also has links to Home and Profile, Swivy clickable to /travelcardcreate route
const NavigationBar = () => {
  return (
    <Wrapper>
    <GlobalStyles />
      <div className="nav-dropdown">
        <DashboardBtn />
        <AppTitle>
          Swivy
        </AppTitle>
      </div>
    </Wrapper>
  )
}
export default NavigationBar;

const AppTitle = styled.div`
@media screen and (max-width: 600px){
  display: none;
}
color: white;
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
background-color: black;
.nav-dropdown {
  display: flex;
  gap: 10px;
}
.menu-btn {
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