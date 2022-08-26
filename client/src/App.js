import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

import NavigationBar from "./components/NavigationBar";
import QuickLog from "./components/QuickLog";
import LoginPage from "./components/LoginPage";

import AuthProfile from "./auth0provider/Profile";
import TravelCard from "./components/TravelCard";
import GlobalStyles from "./components/GlobalStyles";
import Footer from "./components/Footer";

import styled from "styled-components";
const App = () =>{

  
  return (
    <Wrapper>
    <GlobalStyles />
    <BrowserRouter>
      <NavigationBar />
      <Routes>
      <Route 
        exact path="/" 
        element={ <Homepage /> }>
      </Route>
      <Route 
        exact path="/login" 
        element={ <LoginPage /> }>
      </Route>
      <Route
        path="/profile"
        element={ <AuthProfile /> }>  
      </Route>
      <Route
        path="/quicklog"
        element={ <QuickLog /> }>  
      </Route>
      <Route
        path="/travelcard"
        element={ <TravelCard /> }>  
      </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
background-color: #A3C4BC;`