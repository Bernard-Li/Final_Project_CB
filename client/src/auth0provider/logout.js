import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

//Function containing logout button that will redirect the user to the homepage after they log out
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  //The logout button will render based on whether an authenticated user is detected
  return (
    <>
    {isAuthenticated &&
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
    }
    </>
  );
};

export default LogoutButton;