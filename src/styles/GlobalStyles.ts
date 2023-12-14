import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}

    *{
        box-sizing:border-box;
    }

    body{
        width:100vw;
        height:100vh;
    }
`;
