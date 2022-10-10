import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Maked = () => {
  const [data, setData] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2NTM2OTA0NX0.3mKfvlwRu0j8xP1lWAAYzDWSnmFPAt3ayw2Q5p9MoIE";
  const removePin = e => {
    const postRemove = async () => {
      const response = await fetch(
        `http://10.58.52.214:8000/pin/${e.target.id}`,
        {
          method: "POST",
          headers: { authorization: token },
        }
      );
      return response.json();
    };

    postRemove()
      .then(res => {
        //eslint-disable-next-line
        console.log(res);
      })
      .catch(res =>
        //eslint-disable-next-line
        console.log("hi")
      );
  };

  useEffect(() => {
    fetch("http://10.58.52.214:8000/profile/created", {
      headers: { authorization: token },
    })
      .then(res => res.json())
      .then(data => setData([...data.createdList]));
  }, [data]);

  return (
    <SavedContainer>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
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
      </ResponsiveMasonry>
    </SavedContainer>
  );
};

const SavedContainer = styled.div`
  padding-top: 30px;
`;

const SavedImgBox = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;

  button {
    position: absolute;
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

const SavedImg = styled.img`
  width: 263px;
  border-radius: 20px;
`;

export default Maked;
