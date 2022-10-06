import React from "react";
import styled from "styled-components";

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileImg>
        <img
          src="https://i.pinimg.com/280x280_RS/9c/d9/3e/9cd93e6d7019a95669a6a18827f98094.jpg"
          alt="프로필사진"
        />
      </ProfileImg>
      <ProfileId>아이디</ProfileId>
      <ButtonContainer>
        <ButtonShare>공유</ButtonShare>
        <ButtonModify>프로필수정</ButtonModify>
      </ButtonContainer>
    </ProfileContainer>
  );
};

const ButtonShare = styled.button`
  width: 60px;
  height: 48px;
  margin-left: 10px;
  border-radius: 25px;
  border: 0px;

  :hover {
    background-color: lightgray;
  }
`;

const ButtonModify = styled(ButtonShare)`
  width: 105px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 40px;
`;
const ProfileId = styled.div`
  font-size: 40px;
  margin: 20px 0;
`;

const ProfileImg = styled.div`
  margin-top: 20px;

  img {
    border-radius: 50%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Profile;
