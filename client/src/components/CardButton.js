import styled from "styled-components";
import { BiGlobe } from "react-icons/bi";
import { GoGlobe } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Component that will render a better looking travel card to the TravelCardSummary Page
const CardButton = (props) => { //Will take in destination and date? for the custom button to show
	let navigate = useNavigate();
	/*
	IDEA => create mini passports for each card based on the country of the destination
	REQUIRED: Location search API with input field and drop down menu (to confirm accuracy of search)
	*/
	// const [countryCode, setCountryCode] = useState(null);
	// const [loading, setLoading] = useState(false);
	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(`https://countryflagsapi.com/png/${props.country}`)
	// 	.then(res => setCountryCode(res.url))
	// 	setLoading(false);

	// }, [countryCode])
	return (
    <Wrapper
			onClick={() => navigate('/viewtravelcard', {state: {travelCard: props.currentCard}})}>
			<span
				className="title-span">
					{props.destination}</span>
			<span
				className="date-span">
					{props.date}</span>
			<div
				className="goglobe-icon">
			{/* <GoGlobe size={50}/> */}
			</div>
    </Wrapper>
  )
}

export default CardButton;

const Wrapper = styled.button`
display: flex;
flex-direction: row;
/* justify-content: center; */
align-items: center;
min-height: 60px;
min-width: 280px;
max-width: 420px;
margin: 8px;
padding: 8px;
border: 4px solid black;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
transition: all 0.5s ease;
background-color: white;
/* background-image: url({${props => props.countryCode}}); */
/* background-image: url(https://countryflagsapi.com/png/brazil); */
&:hover {
	cursor: pointer;
	background-color: rgba(255, 255, 255, 0.4);
}
.title-span {
	font-size: 28px;
	font-weight: bolder;
	margin-right: 16px;
}
.date-span {
	font-style: italic;
}
`
