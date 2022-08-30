import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";

//This function will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {

  const navigate = useNavigate();
  return (
    <Wrapper>
    <label>Search cards
      <input></input>
    </label>
    <label>Filter
      <select>
        <option>by category</option>
      
      </select>
    </label>
      <h1>My Travel Cards</h1>

      <button className='newcard-btn'
        onClick={() => navigate('/travelcardcreate')}> New Travel Card </button>
    </Wrapper>
  )
}

export default TravelCardSummary;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`