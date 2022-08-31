import styled from "styled-components"
import GlobalStyles from "./GlobalStyles"
import LogoutButton from "../auth0provider/logout";

//Create a footer to assist the navigation of different pages - home, profile (insert others?)
const Footer = () => {
  return (
    <Wrapper>
      <GlobalStyles />
    <div className="logout-btn">
    <LogoutButton />
    </div>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
display: flex;
position: fixed;
justify-content: flex-end;
align-items: center;
bottom: 0;
left: 0;
width: 100%;

background-color: #071013;
height: var(--max-height);

.logout-btn {
  margin-right: 20px;
}
`