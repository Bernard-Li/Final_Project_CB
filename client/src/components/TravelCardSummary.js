import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";

//This function will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {

  const navigate = useNavigate();
  return (
    <>
    <label>Search bar</label>
      <input></input>
      <h1>placeholder for summary of all travel cards</h1>

      <button
        onClick={() => navigate('/travelcardcreate')}> Create Card </button>
    </>
  )
}

export default TravelCardSummary;