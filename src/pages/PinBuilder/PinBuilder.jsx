import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UpperContents from "./UploadForm/UpperContents";
import LowerContents from "./UploadForm/LowerContents";
import { useNavigate } from "react-router-dom";
import { API, accessToken } from "../../config";

const PinBuilder = () => {
  const [submitPin, setSubmitPin] = useState({
    userId: "",
    title: "",
    description: "",
    uploadingImg: "",
    boardId: "",
  });
  const [selectInt, setSelectInt] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [userData, setUserData] = useState({});
  const [interests, setInterests] = useState([]);
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  // const token = localStorage.getItem('token'); http://10.58.52.214:8000/pin ///data/pinBuilder.json
  console.log(submitPin);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${API.MAKED_PIN}`, {
        headers: { authorization: accessToken },
      });
      const data = response.json();

      return data;
    }

    fetchData().then(data => {
      setUserData(data.user);
      setInterests(data.interests);
      setBoards(data.boards);
      setSubmitPin({
        ...submitPin,
        userId: data.user.userId,
        boardId: data.boards[0].boardId,
      });
    });
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", submitPin.userId);
    formData.append("title", submitPin.title);
    formData.append("content", submitPin.description);
    formData.append("pinImage", submitPin.uploadingImg);
    formData.append("boardId", submitPin.boardId);
    formData.append("interests", selectInt);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let response = await fetch(`${API.MAKED_PIN}`, {
      method: "POST",
      headers: {
        authorization: accessToken,
        enctype: "multipart/form-data",
      },
      body: formData,
    });

    if (response.status === 201) {
      alert("저장성공!");
      navigate("/main");
    } else {
      alert("컨텐츠를 모두 채워주쇼");
    }
  };

  return (
    <Wrapper className="name">
      <OuterBox>
        <InnerForm onSubmit={handleSubmit}>
          <UpperContents
            setSubmitPin={setSubmitPin}
            submitPin={submitPin}
            setImageSrc={setImageSrc}
            boards={boards}
            // setBoard={setBoard}
          />
          <LowerContents
            submitPin={submitPin}
            setSubmitPin={setSubmitPin}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            userData={userData}
            interests={interests}
            selectInt={selectInt}
            setSelectInt={setSelectInt}
          />
        </InnerForm>
      </OuterBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  ${props => props.theme.variables.flex()}
  padding: 70px 0;
  background-color: #e9e9e9;
`;

const OuterBox = styled.div`
  ${props => props.theme.variables.flex()}
  width: 880px;
  height: 650px;
  background-color: ${props => props.theme.style.backgroundWhite};
`;

const InnerForm = styled.form`
  width: 800px;
  height: 610px;
`;

export default PinBuilder;
