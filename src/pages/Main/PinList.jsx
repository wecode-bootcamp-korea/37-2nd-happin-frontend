import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { API, accessToken } from "../../config";

const PinList = ({ photo, boardName }) => {
  const [select, setSelect] = useState("");
  const [isStore, setIsStore] = useState(false);
  const { pinId, pinImage, title, username, profileImage } = photo;

  const handleSelect = e => {
    setSelect(e.target.value);
  };

  const handleStoreButton = () => {
    setIsStore(!isStore);
  };

  const storePins = e => {
    const pinNumber = e.target.id;
    fetch(`${API.POST_DETAIL}/${pinNumber}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        boardId: select,
      }),
    })
      .then(res => {
        if (res.ok === true) {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          alert("보드에 저장되었습니다.");
        }
      });
  };

  const deletePins = e => {
    const pinNumber = e.target.id;
    fetch(`${API.POST_DETAIL}/${pinNumber}`, {
      method: "DLELTE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        boardId: select,
      }),
    })
      .then(res => {
        if (res.ok === true) {
          return res.json();
        }
        throw new Error("DELETE 통신실패");
      })
      .then(data => {
        if (data) {
          alert("보드에서 삭제되었습니다.");
        }
      });
  };

  return (
    <PinItem>
      <PinTop>
        <PinImg src={pinImage} alt={pinId} />
        <PinInfo>
          <DownloadButton
            active={isStore}
            id={pinId}
            onClick={e => {
              isStore ? deletePins(e) : storePins(e);
              handleStoreButton();
            }}
          >
            {isStore ? "저장됨" : "저장"}
          </DownloadButton>
          <SelectBox onChange={handleSelect} value={select}>
            {boardName.map(({ id, name }) => (
              <SelectOption key={id} value={id} default>
                {name}
              </SelectOption>
            ))}
          </SelectBox>
        </PinInfo>
      </PinTop>
      <PinText>
        <Link to={`/detail/${pinId}`}>
          <PinTitle>{title}</PinTitle>
          <UserInfo key={pinId}>
            <UserProfile src={profileImage} />
            <UserId>{username}</UserId>
          </UserInfo>
        </Link>
      </PinText>
    </PinItem>
  );
};

export default PinList;

const move = keyframes`
  from{
    transform: scale(0.5);
  }
`;

const PinItem = styled.div`
  position: relative;
  width: 100%;
  animation: ${move} 0.5s linear;
  cursor: pointer;
`;

const PinTop = styled.div``;
const PinImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
`;

const PinInfo = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 63px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  ${PinTop}:hover & {
    display: block;
  }
`;

const SelectBox = styled.select`
  position: absolute;
  top: 12px;
  left: 20px;
  width: 100px;
  height: 40px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SelectOption = styled.option``;

const PinText = styled.div`
  height: 50px;
  margin: 10px 0 0 5px;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const PinTitle = styled.p`
  margin-bottom: 5px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
`;

const UserId = styled.p`
  font-size: 14px;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 80px;
  height: 40px;
  color: #fff;
  background-color: ${props => (props.active ? "#222222" : "#E60024")};
  line-height: 35px;
  text-align: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
