import { useAuth0 } from "@auth0/auth0-react";

//Function that contains the login button to allow a redirect with Auth0 once the user is authenticated. 
const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  //If no user has logged in, the "log in" button will be displayed. Otherwise, the logout function/button will takes its place. 
  return (
  <>
  {!user &&
  <button onClick={() => loginWithRedirect()}>Log In</button>
  }
  </>
  )
};

export default LoginButton;