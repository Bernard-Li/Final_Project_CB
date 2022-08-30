import { createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {  
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState("");

  if(isAuthenticated){
    setCurrentUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}>
      {children}
    </UserContext.Provider>
  )
}