import styled from "styled-components"
import GlobalStyles from "./GlobalStyles"
import LogoutButton from "../auth0provider/logout";
import { FaGithub } from "react-icons/fa";

//Footer will contain links to socials, github, linkedin etc.
const Footer = () => {
  return (
    <Wrapper>
      <GlobalStyles />
    <button
      className="github-btn"
      // onClick={() => navigate('https://github.com/Bernard-Li')}
      ><a href='https://github.com/Bernard-Li'>
    <FaGithub size={30} color={'white'}/>
      </a>
    </button>
    
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
display: flex;
position: fixed;
bottom: 0;
/* border: 2px solid pink; */
justify-content: center;
align-items: center;
/* justify-content: space-evenly; */
width: 100%;
background-color: #071013;
height: var(--max-height);
height: 75px;
/* height: calc(100% - 612px); //same thing as var--maxheight, where the screen size is 667-55  */
.github-btn {
  border-radius: 15px;
  background-color: #071013;
  opacity: 0.5;
  transition: 0.4s ease-out;
  &:hover {
    opacity: 1;
  }
}
`