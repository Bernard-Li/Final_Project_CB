import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from "./Modal";
//This function will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {
  //State to store all the fetched cards from the database
  const [allCards, setAllCards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () =>{
    setOpenModal(!openModal);
  }
  useEffect(() =>{
    const getAllCards = async () =>{
      try {
        await fetch('/api/all-travelcards')
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          setAllCards(data.data);
          setLoading(true);
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllCards();
  }, [])
  const navigate = useNavigate();
  return (
    <Wrapper>
    <div
      className='header-title'>
      <h1 >My Travel Cards</h1>
    </div>
    <label
      className='label-search'>Search cards
      <input
        className='input-search'></input>
    </label>
    <label>Filter
      <select>
        <option>-options-</option>
        <option>Travel Date (newest - oldest)</option>
        <option>Travel Date (oldest - newest)</option>
        <option>A-Z</option>
        <option>Date Added</option>      
      </select>
    </label>
      <TravelCardDisplay>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    {
      
      loading ? allCards.map((card, index) =>{
      
      return (
        <>
        <ul
          className="ul-travelcards">
          <li 
            className='li-travelcards'
            key={`Card# ${index}`}>
            <Button
              onClick={handleModal}>
              <span className='span-title'>
              {card.data.destination}
              </span>
              <span className='span-dates'>
              {card.data.date[0][0] + ' to ' + card.data.date[0][1]}
              </span>
              </Button>
            </li>
        </ul>
          <div>
            
          </div>
        </>
      )
      })
      :
      <>
        <CircularProgress />
      </>
    }
    </TravelCardDisplay>
      <button className='newcard-btn'
        onClick={() => navigate('/travelcardcreate')}> New Travel Card </button>
    </Wrapper>
  )
}

export default TravelCardSummary;

/* for search: Application adapted to iOS, needs responsive CSS. Testing phone size: https://kinsta.com/blog/responsive-web-design/
STYLED COMPONENTS WILL REQUIRE mobile adapting 
Currently adapted to 375 x 667 @ 100%, no throttling, portrait mode*/
const Button = styled.button`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 75vw;

.span-title {
  padding: 5px;
}
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;


.header-title {
  
}
.newcard-btn {
  display: flex;
  position: fixed;
  
  margin-top: 77vh;
  
  
}`
/*
@media screen and (min-height: 400px){
    .newcard-btn {
      margin-top: 30vh; //margin top if the screen is rotated to landscape, optimal position 
    }
  }
*/
const TravelCardDisplay = styled.div`
display: flex;

flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;

border: 2px solid black;
max-height: 80%;

.ul-travelcards .li-travelcards{
  list-style-type: none;
  margin: 5px;
  color: var(--color-font-color);

}`