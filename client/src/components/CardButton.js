import styled from "styled-components";
import { BiGlobe } from "react-icons/bi";
import { useEffect, useState } from "react";

//Component that will render a better looking travel card to the TravelCardSummary Page
const CardButton = (props) => { //Will take in destination and date? for the custom button to show

	const [countryCode, setCountryCode] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch(`https://countryflagsapi.com/png/${props.country}`)
		.then(res => setCountryCode(res.url))
		setLoading(false);

	}, [countryCode])
	return (
    <Wrapper countryCode={countryCode}>
			<span>Jan 2022</span>
			<BiGlobe />
			<span>Destination</span>
    </Wrapper>
  )
}

export default CardButton;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-height: 400px;
max-width: 200px;
padding: 10px;
border: 2px solid black;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;

background-color: white;
background-image: url(${props => props.countryCode});
`
