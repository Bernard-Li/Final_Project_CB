import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { GiRapidshareArrow } from "react-icons/gi";
import { BsBoxArrowLeft } from "react-icons/bs";
import GlobalStyles from "../components/GlobalStyles";

//Function containing logout button that will redirect the user to the homepage after they log out
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  //The logout button will render based on whether an authenticated user is detected
  return (
    <Wrapper>
    <GlobalStyles />
    {isAuthenticated &&
    <>
    <div>
    <button 
      className="logout-btn" 
      onClick={() => logout({ returnTo: window.location.origin })}>
    <BsBoxArrowLeft />
    {/* <GiRapidshareArrow /> */}
      <span className="span-text">Log Out</span>
    </button>
    </div>
    </>
    }
    </Wrapper>
  );
};

export default LogoutButton;

const Wrapper = styled.div`
display: flex;
/* border: 2px solid pink; */
/* background-color: transparent; */
padding: 10px;
max-height: var(--max-height);
z-index: 100 !important;


.logout-btn{
  display: flex;
  color: white;
  width: 88px;
  height: 36px;
  justify-content: center;
  align-items: center;
}
.span-text {
  margin-left: 5px;
}
`