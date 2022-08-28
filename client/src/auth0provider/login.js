import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  
  
  useEffect(() => {
    
    fetch(`/api/create-user`,{
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      }
    })
    if(user){
      console.log('profile is mounted to db, in login');
    }
  }, [loginWithRedirect])
  return (
  <>
  {!user &&
  <button onClick={() => loginWithRedirect()}>Log In</button>
  }
  </>
  )
};

export default LoginButton;