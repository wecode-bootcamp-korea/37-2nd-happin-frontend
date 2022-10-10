import React from "react";
import styled from "styled-components";

const Profile = ({ data }) => {
  return (
    <ProfileContainer>
      <ProfileImg>
        {data && <img src={data.profileImage} alt="프로필사진" />}
      </ProfileImg>
      {data && <ProfileId>{data.username}</ProfileId>}
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
  width: 120px;
  margin-top: 20px;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Profile;
