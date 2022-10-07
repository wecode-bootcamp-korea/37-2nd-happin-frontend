import React, { useEffect } from "react";
import styled from "styled-components";

const IntereststModal = ({ handleModal }) => {
  return (
    <InterestsOverlay>
      <InterestWrapper>
        <Title>
          10개의 관심사 주제 중에서 정보를 받고싶은 3개의 주제를 선택해주세요
        </Title>
        <button>선택</button>
      </InterestWrapper>
    </InterestsOverlay>
  );
};

const InterestsOverlay = styled.div`
  display: ${props => props.theme.variables.flex};
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`;

const InterestWrapper = styled.div`
  padding: 50px 35px;
  width: 800px;
  position: fixed;
  top: 10%;
  left: 0;
  transform: translate(50%, 50%);
  background-color: ${props => props.theme.style.backgroundWhite};
  text-align: center;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.style.fontsizeLg};
`;
export default IntereststModal;
