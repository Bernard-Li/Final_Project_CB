import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { GiMountaintop, GiFeather} from "react-icons/gi"

//A component that renders the navigation bar, displaying the name of the app and storing the log in / log out buttons. Also has links to Home and Profile, Swivy clickable to /travelcardcreate route
const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <Wrapper>
    <GlobalStyles />
      <h2>
        Swivy
      </h2>
      <div>
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
      </button>
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
/* .swivy-btn {
  border: none;
  background-color: #071013;
  font-size: 20px;
  color: white;
} */
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