import styled, { keyframes } from "styled-components";

const rotateslide = keyframes`   
    0% { 
      background-size: 20%;
    }
    80% {
      background-size: 30%;


    }
    100% {
      background-size: 40%;
    }
`;

export const AppStyled = styled.div`
  .header {
    margin: 5px auto;
    text-align: center;
    font-family: cursive;
    font-size: 40px;
    font-weight: bolder;
    background-color: #ca4246;
    border: 1p solid;

    background-image: linear-gradient(
      45deg,
      #ca4246 16.666%,
      #e16541 16.666%,
      #e16541 33.333%,
      #f18f43 33.333%,
      #f18f43 50%,
      #8b9862 50%,
      #8b9862 66.666%,
      #476098 66.666%,
      #476098 83.333%,
      #a7489b 83.333%
    );

    background-size: 20%;
    background-repeat: repeat;

    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;

    animation: ${rotateslide} 5s ease-in-out infinite alternate;
  }

  .body {
    display: flex;
    gap: 10px;
    margin: 0 10px;
    .side-bar {
      width: 20%;
    }
  }
`;
