import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { GiRapidshareArrow } from "react-icons/gi";
//Function containing logout button that will redirect the user to the homepage after they log out
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  //The logout button will render based on whether an authenticated user is detected
  return (
    <Wrapper>
    {isAuthenticated &&
    <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
    {/* <GiRapidshareArrow /> */}
      <span>Log Out</span>
    </button>
    }
    </Wrapper>
  );
};

export default LogoutButton;

const Wrapper = styled.div`
display: flex;


.logout-btn{
  color: white;
  width: 80px;
}
`