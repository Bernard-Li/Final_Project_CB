import styled from "styled-components"
import GlobalStyles from "./GlobalStyles"

const Footer = () =>{
  return (
    <Wrapper>
      <GlobalStyles />
    <p>footer with 3 icons, probably</p>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
display: flex;
position: fixed;

bottom: 0;
left: 0;
width: 100%;

background-color: #071013;
height: var(--max-height);
`