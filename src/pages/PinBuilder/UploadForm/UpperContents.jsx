import React, { useEffect } from "react";
import styled from "styled-components";

const UpperContents = ({ boards, setSubmitPin, setImageSrc }) => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch("", {
  //       headers: {
  //         userId: 2,
  //       },
  //     });
  //     return response;
  //   };
  //   //eslint-disable-next-line
  //   getData().then(res => console.log(res));
  // });

  const handleSelect = e => {
    setSubmitPin(prev => ({ ...prev, boardId: e.target.value }));
  };

  return (
    <UpperContent>
      <div>
        <i
          className="fa-solid fa-utensils"
          onClick={() => {
            setSubmitPin({
              title: "",
              description: "",
              uploadImg: {},
            });
            setImageSrc("");
          }}
        />
      </div>
      <SelectBox>
        <select onChange={handleSelect}>
          {boards.map(ele => {
            return (
              <option value={ele.boardId} key={ele.boardId}>
                {ele.boardName}
              </option>
            );
          })}
        </select>
        <button>생성</button>
      </SelectBox>
    </UpperContent>
  );
};

const UpperContent = styled.div`
  ${props => props.theme.variables.flex("", "space-between", "center")}
  width: 800px;
  height: 40px;
  margin-bottom: 20px;

  i {
    font-size: 30px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;

const SelectBox = styled.div`
  position: relative;

  select {
    width: 200px;
    height: 40px;
    border-radius: 10px 0px 0px 10px;
  }

  button {
    width: 55px;
    height: 40px;
    flex: 0 0 auto;
    border: none;
    border-radius: 0px 8px 8px 0px;
    background-color: ${props => props.theme.style.pinterRed};
    color: white;

    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default UpperContents;
