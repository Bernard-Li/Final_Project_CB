import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import TravelCardSummary from "./components/TravelCardSummary";
import TravelCardCreate from "./components/TravelCardCreate";
import LoginPage from "./components/LoginPage";

import Profile from "./auth0provider/Profile";
import GlobalStyles from "./components/GlobalStyles";
import Footer from "./components/Footer";

import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

//Function that contains and displays components based on the URL (received from user navlink)
const App = () =>{
  const { isAuthenticated } = useAuth0();
  const [ loading, setLoading ] = useState(false);

  const setDelay = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  }
  return (
    <Wrapper>
    <BrowserRouter>
    { //if not user is Authenticated, display the login page as the homepage. Profile component will also render, however it will ask the user to log in before viewing information on it
      !isAuthenticated ?
    <Wrapper>
      <GlobalStyles />
      <NavigationBar />
      <Routes>
        <Route 
          exact path="/" 
          element={ <LoginPage /> }>
        </Route>
        <Route
          path="/profile"
          element={ <Profile /> }>  
        </Route>
      </Routes>
    </Wrapper>
    :
    <>
    <GlobalStyles />
      <NavigationBar />
      <Routes>
        <Route
        //Once logged in (and authenticated becomes true, the homepage will navigate to the travel card page)
          exact path="/" 
          element={ <TravelCardSummary /> }>
        </Route>
        <Route
          path="/profile"
          element={ <Profile /> }>  
        </Route>
        <Route
          path="/travelcardcreate"
          element={ <TravelCardCreate /> }>  
        </Route>
      </Routes>
      <Footer />
    </>
    }
    </BrowserRouter>
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
background-color: #A3C4BC;`