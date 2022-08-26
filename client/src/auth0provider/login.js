import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  console.log(user);
  useEffect(() => {
    
      fetch(`/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type" : "application/json",
        }
      })
    }, [])
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;