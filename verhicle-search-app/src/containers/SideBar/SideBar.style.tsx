import styled from "styled-components";

export const SideBarStyled = styled.div`
  border: 1px solid;
  height: 91vh;
  margin-top: 0;
  border-radius: 20px;
  background-color: #073b3a;

  .filter-bar {
    display: flex;
  }
  .ant-select-selection-item {
    font-family: cursive;
  }

  .ant-select-dropdown {
    background-color: #d5ebcd;
    .ant-select-item-option {
      font-family: cursive;
      &:hover {
        background-color: #a9ec8e;
      }
    }
  }

  .filter {
    margin-left: 30px;
    width: 50%;
    .ant-select-selector {
      background-color: #a9ec8e;
    }
  }

  .title {
    color: #a9ec8e;
    margin: 10px 10px;
    font-size: 25px;
    font-family: cursive;
  }
  .label-type {
    color: #f0a402;
  }
  .insert-title {
    color: #f0a402 !important;
    margin-top: 150px;
  }
  .upload {
    width: 90%;
    height: 180px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed;
    border-radius: 20px;
    border-color: grey;
    .upload-icon {
      margin: 0 auto;
      margin-top: 40px;
      font-size: 60px;
      color: grey;
    }
    .upload-text {
      margin: 0 auto;
      font-size: 24px;
      color: grey;
      user-select: none;
    }
  }
  .btn-upload {
    display: none;
  }
  .img-preview {
    position: relative;
    img {
      max-width: 90%;
      height: 180px;
      display: block;
      margin: 20px auto;
    }
    .change-img {
      opacity: 0;
      color: white;
      font-size: 20px;
      position: absolute;
      text-align: center;
      width: 100%;
      top: 30%;
      user-select: none;
      .change {
        margin-bottom: 20px;
      }
    }
  }

  .img-preview:hover {
    img {
      opacity: 0.5;
    }
    .change-img {
      opacity: 1 !important;
      .change:hover {
        font-size: 23px;
        color: #02ff6b;
      }
      .clear:hover {
        font-size: 23px;
        color: red;
      }
    }
    .change-img:hover {
      cursor: pointer;
    }
  }

  .upload:hover {
    cursor: pointer;
    border-color: white;
    background-color: #095755;
    .upload-icon {
      color: white;
    }
    .upload-text {
      color: white;
    }
  }

  .allow-search-btn {
    button {
      width: 90%;
      display: block;
      margin: 0 auto;
      background-color: #1c8849;
      height: 40px;
      border: none;
      border-radius: 20px;
      color: white;
      font-size: 20px;
      user-select: none;
    }
    button:hover {
      cursor: pointer;
      background-color: #02ff6b;
    }
  }

  .allow-insert-btn {
    button {
      background-color: #c0790d !important;
    }
    button:hover {
      background-color: #ffd902 !important;
    }
  }
  .disabled-search-btn {
    button {
      width: 90%;
      display: block;
      margin: 0 auto;
      background-color: #136835;
      height: 40px;
      border: none;
      border-radius: 20px;
      color: #069606;
      font-size: 20px;
    }
    button:hover {
      cursor: not-allowed;
    }
  }
`;
