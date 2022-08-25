import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect , user} = useAuth0();
  
  useEffect(() => {
    const createNewUser = async () =>{
      await fetch(`/create-user`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type" : "application/json",
        }
      })
    }
    createNewUser();
  }, [])

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;