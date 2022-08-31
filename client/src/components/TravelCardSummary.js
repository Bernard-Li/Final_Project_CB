import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { BiAddToQueue } from "react-icons/bi";

//This function will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {
  const navigate = useNavigate();
  //State to store all the fetched cards from the database
  const [allCards, setAllCards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  //State to store what type of filter has been selected, based on the dropdown option values : none - by default is categorized based on date created, dateNewFirst, dateOldFirst, alphaSort 
  const [filter, setFilter] = useState('none');
  const toggleModal = (e) => {
    
    setModal(!modal);
    }

  const handleFilter = (e) =>{
    setFilter(e.target.value); //back end receiving the string filter and will sort the data based on what is received
  }
  //request to get all the travel cards in the database based on the user. Will refetch if the filter is changed e.g. Alphabetical filter appliaed by the user
  useEffect(() =>{
    const getAllCards = async () =>{
      try {
        await fetch(`/api/all-travelcards/${filter}`)
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
  }, [filter])
  
  return (
    <Wrapper>
    <div
      className='header-title'>
      <h1 >My Travel Cards</h1>
    </div>
    {/* <label
      className='label-search'>Search cards
      <input
        className='input-search'></input>
    </label> */}
    <label>Filter
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
      <TravelCardDisplay>
      <>
    {/* <button className="btn-modal" onClick={toggleModal}>remove me, test button</button> */}
    { modal &&
    <ModalDiv>
      <div className="modal"></div>
        <div className="overlay"
          onClick={toggleModal}></div>
        <div className="modal-content">
          <p>This is a modal for individual travel cards</p>
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
              value={card}
              onClick={toggleModal}
              >
              <span className='span-title'>
              {card.data.destination}
              </span>
              <span className='span-dates'>
              {card.data.date[0][0] + ' to ' + card.data.date[0][1]}
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
          <BiAddToQueue />
        </button>
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
h1 {
  margin: 10px;
}
.select-dropdown {
  margin: 10px;
}
.header-title {
  
}
.newcard-btn {
  
  display: flex;
  position: fixed;
  margin-top: 77vh;
  margin-right: 77vw;
  
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

/* MODAL CSS */


const ModalDiv = styled.div`
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
  background: var(--color-main-opal);
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
}
.btn-modal {
  padding: 10px 20px;
  display: block;
  margin: 100px auto 0;
  font-size: 18px;
}
`