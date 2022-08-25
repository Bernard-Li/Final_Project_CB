import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

import NavigationBar from "./components/NavigationBar";

import AuthProfile from "./auth0provider/Profile";
const App = () =>{

  
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
      <Route 
        exact path="/" 
        element={ <Homepage /> }>
      </Route>
      <Route
        path="/profile"
        element={ <AuthProfile /> }>  
      </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;