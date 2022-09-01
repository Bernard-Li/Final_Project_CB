import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { BiAddToQueue } from "react-icons/bi";
import Weather from "./Weather";

import LoginPage from "./LoginPage";

//This function will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const moment = require('moment');
  //State to store all the fetched cards from the database
  const [allCards, setAllCards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentCard, setCurrentCard] = useState('no selection');
  //State to store what type of filter has been selected, based on the dropdown option values : none - by default is categorized based on date created, dateNewFirst, dateOldFirst, alphaSort 
  const [filter, setFilter] = useState('none');

  const toggleModal = (e, value) => {
    setCurrentCard(value);
    setModal(!modal);
  }

  //calculates the number of days that have elapsed on the trip. Function is called when the modal is toggled to true
  const tripDuration = () => {
    const start = new Date(currentCard.data.date[0][0]);
    const end = new Date(currentCard.data.date[0][1]);
    const diffTime = end.getTime() - start.getTime();
    const numOfDays = diffTime / (1000*3600*24);
    //Will return the number of days if the divison !== 0. 0 Means the it was a one day trip (same start and end date), which has no overnight. 
    if(numOfDays){
      return `${numOfDays+1} days`;
    }
    else {
      return 'Single day trip';
    }
  }


  const handleFilter = (e) =>{
    setFilter(e.target.value); //back end receiving the string filter and will sort the data based on what is received
  }
  //request to get all the travel cards in the database based on the user. Will refetch if the filter is changed e.g. Alphabetical filter appliaed by the user
  useEffect(() =>{
    const getAllCards = async () =>{
      try {
        await fetch(`/api/all-travelcards/?filter=${filter}&user=${user.email}`)
        .then(res => res.json())
        .then(data =>{
          // console.log(data);
          setAllCards(data.data);
          setLoading(true);
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllCards();
    setLoading(false);
  }, [filter]); //important dependency, will re-render the list, showing a loading animation before displaying the filtered data
  
  return (
    <>
    <Wrapper>
    <GlobalStyles />
      <LoginPage /> 
    <div
      className='header-title'>
      <h1 >My Travel Cards</h1>
    </div>
    
    { (allCards == false) && //empty array is the initial state, as fetch runs on mount. [] is truthy and we want to render the div below when there are NO cards. Loose equality used
      <div>
        <h1>Click + to add a new card!</h1>
      </div>
    }
    <div className="filter-div">
    <label className='filter-label'>Sort by
      <select
        onChange={handleFilter}
        className="select-dropdown">
        <option value="none">-options-</option>
        <option value='dateNewFirst'>Travel Date (newest - oldest)</option>
        <option value='dateOldFirst'>Travel Date (oldest - newest)</option>
        <option value='alphaSort'>A-Z</option>
        <option value='alphaSortBackwards'>Z-A</option>
      </select>
    </label>
    
    </div>
      <TravelCardDisplay>
      <>
    {/* <button className="btn-modal" onClick={toggleModal}>remove me, test button</button> */}
    { modal &&
    <ModalDiv>
      <div className="modal"></div>
        <div className="overlay"
          onClick={toggleModal}></div>
        <div className="modal-content">
          <h2>{currentCard.data.destination}</h2>
          { currentCard.data.activity !== 'None selected' &&
          <p>Activity: {currentCard.data.activity}</p>
          }
          <p>Arrival date: {
            currentCard.data.date[0][0]
            }</p>
          <p>Duration of trip: {tripDuration()}</p>
          { currentCard.data.notes &&
          <p>Notes: {currentCard.data.notes}</p>
          }
          {/* { currentCard.data.activity !== 'None selected' &&
          <p>Activity: {currentCard.data.activity}</p>
          } */}
          <button
            className="fullcard-btn"
            onClick={() => navigate('/viewtravelcard', {state: {travelCard: currentCard}})} 
            >View full card</button>
        </div>
        <button className="close-modal"
          onClick={toggleModal}> X </button>
    </ModalDiv>
    }
  </>
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
              
              onClick={(e) => toggleModal(e, card)}
              >
              <span className='span-title'>
              {card.data.destination}
              </span>
              <span className='span-dates'>
              {card.data.date[0][0] === card.data.date[0][1] ?
                card.data.date[0][0] :
                card.data.date[0][0] + ' to ' + card.data.date[0][1]}
              </span>
              </Button>
            </li>
        </ul>
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
        onClick={() => navigate('/travelcardcreate')}>
          <span>+</span>
        </button>
    </Wrapper>
    
    </>
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
max-width: 65vw;
min-width: 45vw;

.span-title {
  padding: 5px;
}
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* border: 2px solid blue; */
h1 {
  margin: 80px 80px 0 80px;
}
.select-dropdown {
  margin: 10px;
}
.header-title {
  
}
.newcard-btn {
  
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-top: 145%;
  margin-right: 80%;
  /* margin-bottom: 50px */
  color: white;
  font-size: 30px;
  
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
margin-bottom: 112px;
/* border: 2px solid black; */
max-height: 80%;

.ul-travelcards .li-travelcards{
  list-style-type: none;
  margin: 5px;
  color: var(--color-font-color);
}

.filter-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  margin: 2px;
}
`
/* MODAL CSS */
const ModalDiv = styled.div`

.fullcard-btn {
  color: white;
  margin: 10px;
}
body.active-modal {
    overflow-y: hidden;
}
.modal, .overlay {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}
.overlay {
  background: rgba(49,49,49,0.8);
}
.modal-content {
  position: absolute;
    
  color: var(--color-font-color);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: var(--color-main-background);
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 250px;
}
.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  color: white;
}
.btn-modal {
  padding: 10px 20px;
  display: block;
  margin: 100px auto 0;
  font-size: 18px;
}
`
const Footer = styled.div`
display: flex;
position: fixed;

align-items: center;
justify-content: center;
border: 1px solid black;
width: 100%;
height: 55px;
bottom: 5;`