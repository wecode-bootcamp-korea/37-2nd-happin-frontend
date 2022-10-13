import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { API, accessToken } from "../../../config";

const Maked = () => {
  const [data, setData] = useState([]);
  const removePin = e => {
    const postRemove = async () => {
      const response = await fetch(`${API.MAKED_PIN}/${e.target.id}`, {
        method: "DELETE",
        headers: { authorization: accessToken },
      });
      return response.json();
    };

    postRemove()
      .then(res => {
        //eslint-disable-next-line
        alert("삭제됐수");
        window.location.replace("/my-page/maked");
      })
      .catch(res =>
        //eslint-disable-next-line
        console.log("hi")
      );
  };

  useEffect(() => {
    fetch(`${API.GET_PIN}`, {
      headers: { authorization: accessToken },
    })
      .then(res => res.json())
      .then(data => setData([...data.createdList]));
  }, []);

  return (
    <SavedContainer>
      <Masonry columnsCount={4} gutter="30px">
        {data &&
          data.map((ele, i) => {
            return (
              <SavedImgBox key={ele.pinId}>
                <button id={ele.pinId} onClick={removePin}>
                  삭제
                </button>
                <Link to={`/pin/${ele.pinId}`}>
                  <SavedImg src={ele.pinImage} />
                </Link>
              </SavedImgBox>
            );
          })}{" "}
      </Masonry>
    </SavedContainer>
  );
};

const SavedContainer = styled.div`
  position: relative;
  padding: 30px 100px 0;
`;

const SavedImgBox = styled.div`
  z-index: 0;

  button {
    position: absolute;
    right: 10px;
    top: 10px;
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

const SavedImg = styled.img`
  width: 100%;
  border-radius: 20px;
`;

export default Maked;
