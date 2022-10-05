import React, { useState } from "react";
import styled from "styled-components";

const BoardModal = ({ modalBoard, setSubmitPin, submitPin, handleModal }) => {
  const [board, setBoard] = useState(["board1", "board2"]);
  //보드 데이터 받으면 setBoard
  const selectBoard = e => {
    console.log(e.target.innerHTML);
    setSubmitPin({ ...submitPin, board: e.target.innerHTML });
    handleModal();
  };
  return (
    <BoardSelector style={{ display: modalBoard }}>
      {board.map((item, i) => {
        return (
          <div key={item + i} onClick={selectBoard}>
            {item}
          </div>
        );
      })}
    </BoardSelector>
  );
};

const BoardSelector = styled.div`
  position: absolute;
  left: 0px;
  top: 25px;
  width: 200px;
  min-height: 200px;
  padding: 10px 0px 0px 10px;
  background-color: yellow;
`;

export default BoardModal;
