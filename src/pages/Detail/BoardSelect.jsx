import React, { useState } from "react";
import styled from "styled-components";

const BoardSelect = ({ pinData, setSelectedBoardId, selectedBoardId }) => {
  const getBoardId = e => {
    setSelectedBoardId(e.target.value.boardId);
  };

  return (
    <BoardList onChange={getBoardId} value={selectedBoardId}>
      {pinData.boards.map(board => {
        return (
          <option key={board.boardId} value={board.boardName}>
            {board.boardName}
          </option>
        );
      })}
    </BoardList>
  );
};

const BoardList = styled.select`
  width: 200px;
  background-color: white;
`;

export default BoardSelect;
