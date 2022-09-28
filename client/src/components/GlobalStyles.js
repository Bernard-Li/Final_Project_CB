import { createGlobalStyle } from "styled-components";
import NinaW_climbs from "../images/NinaW_climbs.jpg";
import MtnBanner from "../images/swiss-mtn-banner.jpg";

//Global Styles file that will store colors and certain presets dimensions, used as required
export default createGlobalStyle`
:root{
  --color-main-opal: #659C8F;//#A3C4BC;
  --color-font-color: #042A2B; //color name: swamp
  --color-vermillion: #D84727;
  --color-crayola-yellow: #FAA916;
  --color-dodge-blue: #4392F1;
  --color-black-blue: #071013;
  --max-height: 55px;
}

body {
  margin: 0px;
  padding: 0px;
  ${'' /* background-color:  #659C8F;//#A3C4BC; */}
  background-color: white;
  //background-image: url(${NinaW_climbs});
  background-image: url(${MtnBanner});
  background-position: 0% 28%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

html, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    padding: 0px;
    margin: 0px;
    //color: #042A2B;
    color: black;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    ${'' /* font-family: 'Mr Dafoe', cursive; */}
  }
//lots of different hues of brown brown-red tried
button {
  border: none;
  &:hover {
    cursor: pointer;
  }
  ${'' /* border-radius: 5px; */}
  ${'' /* padding: 10px; */}
  ${'' /* background-color: #352315; //Umber, orange=#D77A61 //Umber maybe second choice */}
  ${'' /* background-color: #432676; //walnut */}
  ${'' /* background-color: #3b1e08; //brunette */}
  ${'' /* background-color: #2B0504; */}
  ${'' /* background-color: #652A0E; //cinnamon */} //ok to cinnamon
  ${'' /* background-color: #481F01; //syrup ****** Maybe first choice? */}
${'' /* background-color: #A52A2A; //red-brown */}
${'' /* background-color: #659C8F; // opal */}
}`



