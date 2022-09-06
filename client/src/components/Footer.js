import styled from "styled-components"
import GlobalStyles from "./GlobalStyles"
import LogoutButton from "../auth0provider/logout";

//Create a footer to assist the navigation of different pages - home & profile currently
const Footer = () => {
  return (
    <Wrapper>
      <GlobalStyles />
    <div className="logout-btn">
    {/* <button>New Card</button> */}
    <LogoutButton />
    </div>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
display: flex;
position: fixed;
/* border: 2px solid pink; */
justify-content: center;
align-items: center;
/* justify-content: space-evenly; */
bottom: 0;
left: 0;
width: 100%;
background-color: #071013;
height: var(--max-height);
/* height: calc(100% - 612px); //same thing as var--maxheight, where the screen size is 667-55  */`