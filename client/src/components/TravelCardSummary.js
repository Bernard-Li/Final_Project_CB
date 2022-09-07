import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

import Post from "./Post";
import Pagination from "./Pagination";

import LoginPage from "./LoginPage";
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
  
  /* Stretch goals, pagination */
  const [posts, setPosts] = useState([]);
  const [stateLoading, setStateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  
  //Function to get current posts
  const indexOfLastPost = currentPage + postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  
  //Function to change the page that the user is currently viewing
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  /* Stretch pagination above ^ */
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
  const handleFilter = (e) => {
    setFilter(e.target.value); 
  }
  //Request to get all the travel cards in the database based on the user. Will refetch if the filter is changed e.g. Alphabetical filter appliaed by the user
  useEffect(() =>{
    const getAllCards = async () => {
      try {
        await fetch(`/api/all-travelcards/?filter=${filter}&user=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setAllCards(data.data); //contains an array of objects, with each object representing the individual cards
          setLoading(true);
          //Stretch pagination
          setStateLoading(true);
          setPosts(data.data);
          setStateLoading(false);
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
    {(allCards == false) && //empty array is the initial state, as fetch runs on mount. [] is truthy and we want to render the div below when there are NO cards. Loose equality used
      <div>
        <h1>Click + to add your first card!</h1>
      </div>
    }
    <div className="filter-div">
      <label className='filter-label'>Sort by
        <select
          onChange={handleFilter}
          className="select-dropdown">
          {/* default option is date created */}
          <option value="none">Date Created</option>
          <option value='dateNewFirst'>Travel Date (newest - oldest)</option>
          <option value='dateOldFirst'>Travel Date (oldest - newest)</option>
          <option value='alphaSort'>A-Z</option>
          <option value='alphaSortBackwards'>Z-A</option>
        </select>
      </label>
    </div>
      {/* <Post posts={currentPosts} stateLoading={stateLoading} /> */}
      <TravelCardDisplay>
      <>
      { //The modal will have conditional rendering based on the information or lack of information the user chooses to store in their card
        modal &&
      <ModalDiv>
        <div className="modal"></div>
          <div className="overlay"
            onClick={toggleModal}></div>
          <div className="modal-content">
            <h2>{currentCard.data.destination}</h2>
            { currentCard.data.activity !== 'None selected' &&
            <p><span>Activity</span>: {currentCard.data.activity}</p>
            }
            <p><span>Arrival date:</span> {
              currentCard.data.date[0][0]
              }</p>
            <p><span>Duration of trip:</span> {tripDuration()}</p>
            { currentCard.data.notes &&
            <p className="paratag-notes"><span>Notes:</span> {currentCard.data.notes}</p>
            }
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
    { loading ?
    <>
      <ul className="ul-travelcards">
        {
          currentPosts.map((post, index) => {
            return (
              <div className="card-container">
            <li key={post._id} className="li-travelcards">
            <Button
              onClick={(e) => toggleModal(e, post)}>
              <p>New {post.data.destination}</p>
              <p>{post.data.date[0][0] + '-' + post.data.date[0][1]}</p>
            </Button>
            </li>
            </div>
            )
          })
        }
      </ul>
      <Pagination 
        postsPerPage={postsPerPage} 
          totalPosts={posts.length} 
          paginate={paginate} />
      </>
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
width: 300px;
border: 2px solid var(--color-font-color);
@media screen and (max-width: 480px) {
  max-width: 200px;
}
/* max-width: 65vw;
min-width: 60vw; */
.span-title {
  padding: 5px;
}`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* border: 2px solid blue; */
h1 {
  margin: 80px 60px 0 80px;
}
.select-dropdown {
  margin: 10px;
}
.newcard-btn {
  
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 2px solid var(--color-font-color);
  //margin-top: 145%;margin-right: 80%;
  /* margin-bottom: 50px */
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
}`

/* MODAL CSS */
const ModalDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
span {
  font-weight: bold;
}
.paratag-notes {
  @media screen and (max-width: 375px) {
    min-width: 50px;  
    max-width: 325px;
  }
}
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
  padding: 14px 28px 14px 28px;
  border-radius: 8px;
  max-width: 600px;
  @media screen and (max-width: 425px) {
    max-width: 250px;
  }
  @media screen and (max-width: 667px){
    min-width: 350px;
  }
  min-width: 550px;
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
}`
const Footer = styled.div`
display: flex;
position: fixed;

align-items: center;
justify-content: center;
border: 1px solid black;
width: 100%;
height: 55px;
bottom: 5;`