import React from "react";
import Search from "./Search";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavLayout>
      <NavWrap>
        <Logo src="./images/happin_logo.jpeg" alt="로고" />
        <HomeMenu>홈</HomeMenu>
        <PinMenu>핀 만들기</PinMenu>
        <Search />
        <ProfileImg src="https://youth1.com/sites/all/themes/youth1_2016/images/avatar-default.jpg" />
        <Logout />
      </NavWrap>
    </NavLayout>
  );
};

export default Nav;

const NavLayout = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;
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
`;

const HomeMenu = styled.div`
  padding: 15px 20px;
  color: #fff;
  background-color: ${({ theme }) => theme.style.deepGrey};
  border-radius: 40px;
`;

const PinMenu = styled.div`
  padding: 0 10px;
  color: ${({ theme }) => theme.style.deepGrey};
  font-weight: 700;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
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
  }
`;
