import React from "react";
import styled from "styled-components";

const StoreButton = () => {
  return <Button>저장</Button>;
};

const Button = styled.button.attrs({
  type: "button",
})`
  padding: 15px 35px;
  background-color: #e60024;
  border-radius: 25px;
  border-style: none;
  color: white;

  &:hover {
    opacity: 0.7;
  }
`;

export default StoreButton;
