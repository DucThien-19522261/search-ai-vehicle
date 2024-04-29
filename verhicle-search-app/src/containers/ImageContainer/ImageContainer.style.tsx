import styled from "styled-components";

export const ImageContainerStyled = styled.div`
  width: 80%;
  height: 95vh;
  background-color: #c1f8c1;
  border: 3px solid;
  border-color: #197919;
  border-radius: 20px;
  padding: 10px;
  .loading {
    display: flex;
    height: 100%;
    .loading-icon {
      margin: auto;
      font-size: 40px;
    }
  }

  .no-data {
    /* display: flex;
    flex-direction: column; */
    color: #555454;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20%;
    .cloud-icon {
      font-size: 100px;
      color: #555454;
    }
  }
  .list-image-container {
    height: 100%;
    overflow: auto;

    img {
      top: 50%;
      max-width: 350px;
      border-radius: 5px;
    }
  }
`;
