import React, { useState } from "react";
import styled from "styled-components";
import { FiLink } from "react-icons/fi";
import { BiDownload } from "react-icons/bi";
import BoardSelect from "./BoardSelect";
import { API } from "../../config";

const DetailUpper = ({ pinData, selectedBoardId, setSelectedBoardId }) => {
  const accessToken = localStorage.getItem("token");
  console.log(pinData);
  const { pinId, title, content, pinImage } = pinData.pin;
  const { email, userName, profileImage } = pinData.author[0];

  async function copyLink(e) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("복사되었습니다");
    } catch (error) {
      alert("복사를 실패하였습니다");
    }
  }

  const postBoardId = () => {
    fetch(`${API.POST_DETAIL}/${pinId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      },
      body: JSON.stringify({
        boardId: selectedBoardId,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <DetailContentContainer>
      <DetailImg src={pinImage} />
      <DetailContent>
        <DetailContentHeader>
          <DetailIcons>
            <IconContainer>
              <LinkIcon onClick={e => copyLink(e)} />
            </IconContainer>
            <IconContainer>
              <ImgDownload href={pinImage} download="filename" target="_blank">
                <DownloadIcon />
              </ImgDownload>
            </IconContainer>
          </DetailIcons>
          <BoardSelect
            pinData={pinData}
            setSelectedBoardId={setSelectedBoardId}
            selectedBoardId={selectedBoardId}
          />
          <Button onClick={postBoardId}>저장</Button>
        </DetailContentHeader>
        <DetailTitle>{title}</DetailTitle>
        <DetailDes>{content}</DetailDes>
        <UserProfile>
          <ProfileImg src={profileImage} />
          <UserInfo>
            <UserName>{userName}</UserName>
            <span>{email}</span>
          </UserInfo>
        </UserProfile>
        <RelatedInterest>연관관심사</RelatedInterest>
        {pinData.pinInterests.map(interest => {
          return (
            <InterestTitle key={interest.interestId}>
              #{interest.interest}
            </InterestTitle>
          );
        })}
      </DetailContent>
    </DetailContentContainer>
  );
};

const DetailContentContainer = styled.div`
  display: flex;
  margin-top: 110px;
  width: 1016px;
  border-radius: 20px;
  box-shadow: 0px 8px 10px 4px #b3b1b1;
`;

const ImgDownload = styled.a``;

const Button = styled.button.attrs({
  type: "button",
})`
  padding: 15px 35px;
  background-color: #e60024;
  border-radius: 25px;
  border-style: none;
  color: white;

  &:hover {
    opacity: 0.7;
  }
`;

const DetailImg = styled.img`
  width: 508px;
  margin-right: 20px;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
`;

const DetailContent = styled.div`
  padding: 15px;
  width: 508px;
`;

const DetailContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const DetailIcons = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  position: relative;

  &:hover {
    background-color: #d5d8dc;
    opacity: 0.5;
  }
`;

const LinkIcon = styled(FiLink)`
  font-size: 25px;
  margin-right: 10px;
  position: absolute;
  top: 7px;
  left: 7px;
  cursor: pointer;
`;

const DownloadIcon = styled(BiDownload)`
  font-size: 25px;
  color: black;
  margin-right: 10px;
  position: absolute;
  top: 7px;
  left: 7px;
  cursor: pointer;
`;

const DetailTitle = styled.div`
  font-size: 40px;
  font-weight: ${props => props.theme.style.fontWeightSemibold};
  margin-top: 50px;
`;

const DetailDes = styled.div`
  margin: 1.2em 0 40px 0;
  line-height: 1.3em;
  font-size: ${props => props.theme.style.fontSizeLg};
`;

const UserProfile = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  ${props => props.theme.variables.flex("column", "center", "")}
  line-height: 1.3em;
`;

const UserName = styled.span`
  font-weight: ${props => props.theme.style.fontWeightSemibold};
`;

const ProfileImg = styled.img`
  margin-right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const RelatedInterest = styled.div`
  margin-top: 80px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: ${props => props.theme.style.fontWeightSemibold};
`;

const InterestTitle = styled.button`
  background-color: ${props => props.theme.style.black};
  padding: 15px 30px;
  border-radius: 30px;
  border-style: none;
  color: white;
`;

export default DetailUpper;
