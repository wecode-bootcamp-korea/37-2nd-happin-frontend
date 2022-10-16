import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import styled from "styled-components";
import { API, accessToken } from "../../config";

const Nav = () => {
  const TOKEN = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const goToMain = () => {
    navigate(`/main`);
  };
  const goToPinBuilder = () => {
    navigate(`/pin-builder`);
  };
  const goToMyPage = () => {
    navigate(`/my-page/saved`);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/`);
  };

  useEffect(() => {
    TOKEN &&
      fetch(`${API.MAIN}`, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: TOKEN,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo(data.users);
        });
  }, [TOKEN]);

  if (
    window.location.pathname === "/" &&
    "/interest" &&
    "/auth/kakao/callback"
  ) {
    return null;
  } else {
    return (
      <NavLayout>
        <NavWrap>
          <Logo src="/images/happin_logo.jpeg" alt="로고" onClick={goToMain} />
          <HomeMenu onClick={goToMain}>홈</HomeMenu>
          <PinMenu onClick={goToPinBuilder}>핀 만들기</PinMenu>
          <Search />
          {userInfo &&
            userInfo.map(({ id, profile_image, username }) => (
              <ProfileArea key={id}>
                <ProfileImg src={profile_image} onClick={goToMyPage} />
                <ProfileModal>내 프로필</ProfileModal>
                <MyName>{username} 님</MyName>
              </ProfileArea>
            ))}
          <Logout onClick={handleLogout} />
        </NavWrap>
      </NavLayout>
    );
  }
};

export default Nav;

const NavLayout = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  background: #fff;
  z-index: 99;
`;

const NavWrap = styled.nav`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
`;

const HomeMenu = styled.div`
  padding: 15px 20px;
  color: #fff;
  background-color: ${({ theme }) => theme.style.deepGrey};
  border-radius: 40px;
  cursor: pointer;
`;

const PinMenu = styled.div`
  padding: 0 10px;
  color: ${({ theme }) => theme.style.deepGrey};
  font-weight: 700;
  cursor: pointer;
`;

const ProfileArea = styled.div`
  position: relative;
  margin: 0 5px;
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileModal = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  padding: 10px;
  background: ${({ theme }) => theme.style.deepGrey};
  font-size: 12px;
  color: #fff;
  border-radius: 20px;
  text-align: center;

  ${ProfileArea}:hover & {
    display: block;
  }
`;

const MyName = styled.span`
  display: block;
  margin-top: 3px;
  font-size: 14px;
  text-align: center;
`;
const Logout = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  background: none;
  border: none;

  &::after {
    content: "\f08b";
    font-family: FontAwesome;
    font-size: 20px;
    margin-left: 10px;
  }
`;
