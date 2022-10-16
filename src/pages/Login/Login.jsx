import React from "react";
import { KAKAO_OAUTH_URL } from "./OAUTH_URL";
import styled from "styled-components";
import BackgroundImg from "../../assets/images/background03.jpg";
import Logo from "../../assets/images/Logo.jpeg";
import Title from "./title.png";

const Login = () => {
  return (
    <BackgoundImg>
      <Overlay>
        <LoginWrapper>
          <LoginLogo src={Logo} />
          <LoginTitle scr={Title} />
          <LoginDes>
            간편하게 로그인하고 HAPPIN으로 다른 사람과 소통하세요!
          </LoginDes>
          <a href={KAKAO_OAUTH_URL}>
            <KakaoBtn
              src="images/Login/kakao_login_medium_wide.png"
              alt="카카오로그인버튼"
            />
          </a>
        </LoginWrapper>
      </Overlay>
    </BackgoundImg>
  );
};
const BackgoundImg = styled.div`
  background-image: url(${BackgroundImg});
  width: 100vm;
  height: 100vh;
  background-size: cover;
`;

const Overlay = styled.div`
  ${props => props.theme.variables.flex()}
  width: 100vm;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoginWrapper = styled.div`
  ${props => props.theme.variables.flex("column")}
  background-color: ${props => props.theme.style.backgroundWhite};
  padding: 100px 85px;
  border-radius: 10px;
  box-shadow: 0 30px 40xpx rgba(196, 192, 192, 0.6);
`;

const LoginLogo = styled.img`
  margin-bottom: 30px;
  width: 200px;
`;

const LoginTitle = styled.img.attrs(props => ({
  src: `${Title}`,
}))`
  margin-bottom: 50px;
  width: 500px;
`;
const LoginDes = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
`;

const KakaoBtn = styled.img`
  width: 450px;
`;
export default Login;
