import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavigationBar from "./components/NavigationBar";
import TravelCardSummary from "./components/TravelCardSummary";
import TravelCardCreate from "./components/TravelCardCreate";
import TravelCard from "./components/TravelCard";
import LoginPage from "./components/LoginPage";

import Profile from "./auth0provider/Profile";
import GlobalStyles from "./components/GlobalStyles";
import Footer from "./components/Footer";

import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import  Stack from "@mui/material/Stack";

//Function that contains and displays components based on the URL (received from user navlink)
const App = () =>{
  const { isAuthenticated, isLoading } = useAuth0();
  
  //this if statement will render a loading icon/page if the user refreshes while logged in
  //omits the display of the conditionally rendered page based on Authentication.
  if(isLoading){
    return (
    <Wrapper>
      <GlobalStyles />
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
        <LoadingCircle>
          <Stack sx={{color: 'grey.500'}}>
          <CircularProgress color="inherit" />
          </Stack>
        </LoadingCircle>
        
      <Footer />
    </Wrapper>
    )
  }
  
  return (
    <Wrapper>
    <BrowserRouter>
    { //if not user is Authenticated, display the login page as the homepage. Profile component will also render, however it will ask the user to log in before viewing information on it
      !isAuthenticated ?
    <Wrapper>
      <GlobalStyles />
      <span className='navbar'><NavigationBar /></span>
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
    <span className='navbar'><NavigationBar /></span>
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
        <Route
          path="/viewtravelcard"
          element={ <TravelCard /> }>  
        </Route>
      </Routes>
      <span className='footer-span'><Footer /></span>
    </>
    }
    </BrowserRouter>
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
background-color: var(--color-background);
.navbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}`
// .footer-span {
//   overflow: auto;
//   position: fixed;
//   bottom: 0;
//   width: 100%;
// }
const LoadingCircle = styled.div`
margin-top: 20vh;
margin-left: 45vw;`