import { createGlobalStyle } from "styled-components";
import NinaW_climbs from "../images/NinaW_climbs.jpg";

//Global Styles file that will store colors and certain presets dimensions
export default createGlobalStyle`
:root{
  --color-main-opal: #A3C4BC;
  --color-font-color: #042A2B;
  --color-vermillion: #D84727;
  --color-crayola-yellow: #FAA916;
  --color-dodge-blue: #4392F1;
  --max-height: 55px;
}

body {
  margin: 0px;
  padding: 0px;
  background-color:  #A3C4BC;
  background-image: url(${NinaW_climbs});
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
    color: white;
  }

button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #D77A61;
}`



