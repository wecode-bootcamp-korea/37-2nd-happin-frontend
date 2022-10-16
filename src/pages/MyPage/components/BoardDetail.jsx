import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Masonry from "react-responsive-masonry";
import { useParams } from "react-router-dom";
import { API, accessToken } from "../../../config";

const BoardDetail = () => {
  const [pins, setPins] = useState([]);
  // const id = 2; // 얘 mypage에서 props로 넘겨 받기.
  //`http://10.58.52.214:8000/board/${id}`
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${API.BOARD}/${id}`, {
        headers: { authorization: accessToken },
      });
      return response.json();
    };
    getData().then(res => setPins(res.pins));
  }, []);

  const removePin = e => {
    const postRemove = async () => {
      const response = await fetch(`${API.BOARD}/${id}/${e.target.id}`, {
        method: "DELETE",
        headers: { authorization: accessToken },
      });
      return response.json();
    };

    postRemove()
      .then(res => {
        alert("삭제되었습니다");
        window.location.replace(`/my-page/${id}`);
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
  margin: 130px 100px 0 100px;
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
    top: 10px;
    right: 10px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: red;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #999;
      opacity: 0.7;
    }
  }
`;

export default BoardDetail;
