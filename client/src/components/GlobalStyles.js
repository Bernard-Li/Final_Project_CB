import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
  --color-main-opal: #A3C4BC;
  --color-font-color: #042A2B;
  --color-vermillion: #D84727;
  --color-crayola-yellow: #FAA916;
  --color-dodge-blue: #4392F1;
}


body {
  background-color:  #A3C4BC;
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

    color: #042A2B;


  }

button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  //background-color: #D84727;
}

`



