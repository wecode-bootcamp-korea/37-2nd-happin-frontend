import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Masonry from "react-responsive-masonry";
import { useParams } from "react-router-dom";

const BoardDetail = () => {
  const [pins, setPins] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2NTM2OTA0NX0.3mKfvlwRu0j8xP1lWAAYzDWSnmFPAt3ayw2Q5p9MoIE";
  // const id = 2; // 얘 mypage에서 props로 넘겨 받기.
  //`http://10.58.52.214:8000/board/${id}`
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://10.58.52.214:8000/boards/${id}`, {
        headers: { authorization: token },
      });
      return response.json();
    };
    getData().then(res => setPins(res.pins));
  }, []);

  const removePin = e => {
    console.log(e.target.id);
    const postRemove = async () => {
      const response = await fetch(
        `http://10.58.52.214:8000/boards/${id}/${e.target.id}`,
        {
          method: "DELETE",
          headers: { authorization: token },
        }
      );
      return response.json();
    };

    postRemove()
      .then(res => {
        console.log(res.status); //200
      })
      .catch(res => console.log("hi"));
  };

  return (
    <PinContainer>
      <Masonry columnsCount={3} gutter="1.5rem">
        {pins.map(ele => {
          return (
            <Pins key={ele.pinId}>
              <img src={ele.pinImage} alt="pin" />
              <button id={ele.pinId} onClick={removePin}>
                삭제
              </button>
            </Pins>
          );
        })}
      </Masonry>
    </PinContainer>
  );
};

const PinContainer = styled.div`
  padding-top: 76px;
`;

const Pins = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  button {
    position: absolute;
    right: 0px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;

    &:hover {
      background-color: white;
    }
  }
`;

export default BoardDetail;
