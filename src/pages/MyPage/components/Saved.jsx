import React from "react";
import styled from "styled-components";

const Saved = () => {
  return (
    <SavedContainer>
      <BoardSection>
        <div className="board">생성보드정렬</div>
      </BoardSection>
      <div>
        {false ? <span>이미지정렬 </span> : <span>아직 저장된 핀 없음</span>}
      </div>
    </SavedContainer>
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

const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

export default Saved;
