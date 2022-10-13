import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DetailUpper from "./DetailUpper";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { API, accessToken } from "../../config";

const Detail = () => {
  const [pinData, setPinData] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const { pinId } = params;

  useEffect(() => {
    fetch(`${API.DETAIL}/${pinId}`, {
      mehtod: "GET",
      headers: {
        authorization: accessToken,
        userId: 2,
      },
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러발생");
      })
      .catch(error => console.log(error))
      .then(data => {
        setPinData(data);
        setSelectedBoardId(data.boards[0].boardId);
      });
  }, []);

  const goBack = () => {
    navigate(`/main/?pinId=${params}`);
  };

  // useEffect(() => {
  //   fetch("data/detail.json")
  //     .then(res => res.json())
  //     .then(data => setPinData(data));
  // }, []);

  return (
    <DetailWrapper>
      <BackToPage onClick={goBack} />
      {pinData && (
        <DetailUpper
          pinData={pinData}
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
        />
      )}
    </DetailWrapper>
  );
};
const DetailWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackToPage = styled(IoIosArrowBack)`
  color: ${props => props.theme.style.lightGrey};
  font-size: 50px;
  margin-right: 55px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.style.pinterRed};
  }
`;

export default Detail;
