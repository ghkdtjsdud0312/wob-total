import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
  :root {
    --GREEN : #04BF8A;  // 대표 색
    --MINT : #DFEDE9;
    --PINK : #FF6482;
    --BLACK : #353535;
    --WHITE: #FFFFFF;
    --GRAY : #EEEEEE;
  }

  * {
      box-sizing: border-box;
    }

    html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button, textarea, select, input{
    font-family: 'Do Hyeon', sans-serif;
  /* font-family: 'Orbit', sans-serif; */
  /* font-family: 'Gowun Dodum', sans-serif; */
  }
  h2 {
    font-size: 2.4em;
  }
  h3 {
    font-size: 1.6em;
  }

  .container {
    width: 100vw;
    margin: 0 auto;
    }

 .body {
    margin: 0;
    padding: 0;
 }

`;

export default GlobalStyle;
