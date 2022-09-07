import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

//Function that contains the login button to allow a redirect with Auth0 once the user is authenticated. 
const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  //If no user has logged in, the "log in" button will be displayed. Otherwise, the logout function/button will takes its place. 
  return (
  <Wrapper>
  {!user &&
  <button 
    className="login-btn"
    onClick={() => loginWithRedirect()}>Start Tracking</button>
  }
  </Wrapper>
  )
};

export default LoginButton;

const Wrapper = styled.div`
display: flex;

.login-btn {
  margin: 10px;
  color: white;
  width: 108px;
  height: 40px;
}`