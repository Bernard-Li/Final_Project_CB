import { useAuth0 } from "@auth0/auth0-react";
import GlobalStyles from "../components/GlobalStyles";
import styled from "styled-components";

//Function that contains the login button to allow a redirect with Auth0 once the user is authenticated. 
const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  //If no user has logged in, the "log in" button will be displayed. Otherwise, the logout function/button will takes its place. 
  return (
  <Wrapper>
  <GlobalStyles />
  {!user &&
  <button 
    className="login-btn"
    onClick={() => loginWithRedirect()}>Sign In</button>
  }
  </Wrapper>
  )
};

export default LoginButton;

const Wrapper = styled.div`
display: flex;

.login-btn {
  margin: 10px;
  color: black;
  font-weight: bolder;
  width: 108px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid black;
  transition: 0.5s ease;
  &:hover{
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.4);
    
  }
}`