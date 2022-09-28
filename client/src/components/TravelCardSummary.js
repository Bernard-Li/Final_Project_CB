//Pagination resource : https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { BsSortAlphaDownAlt, BsSortAlphaDown } from 'react-icons/bs';
import { TbCalendarTime } from 'react-icons/tb';
import LoginPage from "./LoginPage";
import CardButton from "./CardButton";

//This component will GET all the travel cards from the database based on the logged in user.
//Displays fetched cards in an organized list. The user will then be able to search or filter based on what they are looking for.
const TravelCardSummary = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  //State to store all the fetched cards from the database
  const [allCards, setAllCards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentCard, setCurrentCard] = useState('no selection');

  //State to store what type of filter has been selected, based on the dropdown option values : none - by default is categorized based on date created, dateNewFirst, dateOldFirst, alphaSort 
  const [filter, setFilter] = useState('none');
  
  //Function to handle the modal toggle and shows the info based on what the user clicked on - passed in param VALUE
  const toggleModal = (e, value) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'}); //scrolls to top of page to view modal
    setCurrentCard(value);
    setModal(!modal);
  }

  //Calculates the number of days that have elapsed on the trip. Function is called when the modal is toggled to true
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

  //Function that passes the strig code filtered selected by user to the state filter, will be used in the backend
  const handleFilter = (e, filter) => {
    // setFilter(e.target.value); 
    console.log(e.target.value);
    setFilter(filter); 
  }
  //Request to get all the travel cards in the database based on the user. Will refetch if the filter is changed e.g. Alphabetical filter appliaed by the user
  useEffect(() =>{
    const getAllCards = async () => {
      try {
        await fetch(`/api/all-travelcards/?filter=${filter}&user=${user.email}`)
        .then(res => res.json())
        .then(data =>{
          // console.log(data);
          setAllCards(data.data);
          console.log(data.data);
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
          <div>
            <h1>My Travel Cards</h1>
          </div>
          <div>
            <CreateCard
              onClick={() => navigate('/travelcardcreate')}>
              <span>New Card</span>
            </CreateCard>
          </div>
        </div>
    {(allCards == false) && //empty array is the initial state, as fetch runs on mount. [] is truthy and we want to render the div below when there are NO cards. Loose equality used
      <div>
        <h1>Click '+ New Card' to add your first card!</h1>
      </div>
    }
    <SortButton>
    <span
      className="time-span">
      <button
        className="sort-btn"
        onClick={(e) => handleFilter(e, 'dateNewFirst')}>
        <TbCalendarTime size={30} />
      </button>
    </span>
    <span
      className="alpha-span">
      <button
        className="sort-btn"
        onClick={(e) => handleFilter(e, 'alphaSort')}>
        <BsSortAlphaDown size={30} />
      </button>
    </span>
    <span
      className="alphadown-span">
      <button
        className="sort-btn"
        onClick={(e) => handleFilter(e, 'alphaSortBackwards')}>
        <BsSortAlphaDownAlt size={30}/>
      </button>
    </span>
    
    </SortButton>
    { /*
    <div className="filter-div">
      <label className='filter-label'>Sort by
        <select
          onChange={handleFilter}
          className="select-dropdown">
          <option value="none">Date Created</option>
          <option value='dateNewFirst'>Travel Date (newest - oldest)</option>
          <option value='dateOldFirst'>Travel Date (oldest - newest)</option>
          <option value='alphaSort'>A-Z</option>
          <option value='alphaSortBackwards'>Z-A</option>
        </select>
      </label>
    </div>
    */ }
      <TravelCardDisplay>
    {/* <Banner alt='banner' src={MtnBanner}> */}
    {/*PROP only required if Cardbutton receives a location based on destination search e.g.  country={'BR'} */}
    {
      loading ? allCards.map((card, index) =>{
      return (
        <>
        <CardButton 
          destination={card.data.destination} 
          date={card.data.date[0][0]}
          currentCard={card}             
          />

        {/* <ul
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
        </ul> */}
        </>
      )
      })
      :
      <>
        <CircularProgress />
        {/* <h1>loading....</h1> */}
      </>
    }
    </TravelCardDisplay>
      {/* <button className='newcard-btn'
        onClick={() => navigate('/travelcardcreate')}>
          <span>New Card</span>
        </button> */}
    </Wrapper>
    
    </>
  )
}

export default TravelCardSummary;

/* for search: Application adapted to iOS, needs responsive CSS. Testing phone size: https://kinsta.com/blog/responsive-web-design/
STYLED COMPONENTS WILL REQUIRE mobile adapting 
Currently adapted to 375 x 667 @ 100%, no throttling, portrait mode*/
const SortButton = styled.div`
display: flex;
justify-content: space-evenly;
margin: 10px;
span {
  margin-left: 8px;
  margin-right: 8px;
}
.sort-btn {
  border-radius: 8px;
}
`
const CreateCard = styled.button`
  border: none;
  background-color: white;
  border-radius: 8px;
  margin: 8px;
  transition: all 0.25s ease;
  padding: 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4); //decimal dictates opacity of the background frame
    font-weight: bolder;
}
&:active {
  transform: translateY(2px);
}`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
h1 {
  margin: 80px 60px 0 60px;
}
.header-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.select-dropdown {
  margin: 8px;
}
.newcard-btn {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  @media screen and (max-width: 440px){
    margin-right: 80%;
  }
  margin-right: 60%;
  /* For small screens: */
  margin-top: 80vh;
  color: white;
  font-size: 30px;
  z-index: 999;
}`

const TravelCardDisplay = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;
margin-bottom: 112px;
border-radius: 8px;
/* border: 2px solid black; */
background-color: rgba(255, 255, 255, 0.4); //decimal dictates opacity of the background frame
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
}`

