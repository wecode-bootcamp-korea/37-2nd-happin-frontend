import React from "react";
import styled from "styled-components";

const Maked = () => {
  return (
    <MakedContainer>
      <BoardSection>
        <div className="board">생성보드정렬</div>{" "}
        <div className="board">생성보드정렬</div>
      </BoardSection>
      {false ? <span>이미지정렬 </span> : <span>아직 생성된 핀 없음</span>}
    </MakedContainer>
  );
};

const BoardSection = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  width: 100%;
  .board {
    width: 200px;
    height: 200px;
    margin-right: 10px;
    background-color: yellow;
  }
`;
const MakedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

export default Maked;
