import React from "react";
import styled from "styled-components";

const StoreButton = () => {
  // const [isOpenModal, setIsOpenModal] = useState(false);

  // const handleModal = () => {
  //   console.log("hihihi");
  //   setIsOpenModal(prev => !prev);
  // };

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
