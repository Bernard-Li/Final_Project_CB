import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const TravelCard = () => {
  const location = useLocation();
  const moment = require('moment');
  //represents the card that was sent with useNavigation from the modal "view full card"
  const userCard = location.state.travelCard;
  console.log(userCard);
  
  const dateToText = () =>{
    const start = new Date(userCard.data.date[0][0]);
    const finish = new Date(userCard.data.date[0][1]);
    const textDateStart = (moment(start).format('dddd MMMM Do, YYYY'));
    if(userCard.data.date[0][0] !== userCard.data.date[0][1]){
      const textDateEnd = (moment(finish).format('dddd MMMM Do, YYYY'));
      return (
        <>
          <p>Start Date: {textDateStart}</p>
          <p>End Date: {textDateEnd}</p>
        </>
      );
    }
    else {
      return ( <p>Start Date: {textDateStart}</p> );
    }
    
  }
  return (
    <Wrapper>
    
    <GlobalStyles />
    <Container className="container-div">
      <h1>{userCard.data.destination}</h1>
      <div>{dateToText()}</div>
      { userCard.media &&
      <ImageContainer alt='personal user uploaded file' src={userCard.media}/>
      }
      

      
    </Container>
    </Wrapper>
    
  )
}
export default TravelCard;

const Wrapper = styled.div`
display: flex;
justify-content: center;
`
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 75px;
max-width: 375px;
margin-bottom: 75px;
`
const ImageContainer = styled.img`
display: flex;
height: auto;
width: 375px;`