import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Weather from "./Weather";


const Homepage = () =>{
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
    {isAuthenticated ?
    //everything in the 'true' part of the ternary operator is what the user sees after being authenticated
    <Wrapper>
      <h2>Welcome, {user.name}!</h2>
      <NavLink to="/quicklog">
        <button>Quick Log</button>
      </NavLink>
      <NavLink to="/travelcard">
        <button>Travel Card</button>
      </NavLink>

      <Weather />
    </Wrapper>
      :
    //everything below this statement is the default homepage
      <h2> This is the homepage palceholder </h2>
    }
    </>
  )
}

export default Homepage;

const Wrapper = styled.div`


button {
  padding: 10px;

}
`