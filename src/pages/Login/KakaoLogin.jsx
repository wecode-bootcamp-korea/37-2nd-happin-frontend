import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../config";
import Spinner from "../../assets/images/login-loading.gif";

const KakaoLogin = () => {
  const navigate = useNavigate();

  const kakaoLogin = async function () {
    let code = new URL(window.location.href).searchParams.get("code");

    let response = await axios({
      url: `${API.LOGIN}`,
      method: "POST",
      data: {
        code: code,
      },
    });
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/main");
    } else {
      navigate("/");
      alert("다시 로그인해주세요");
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, []);

  return (
    <>
      <LodingOverlay />
      <LogingBackground>
        <img src={Spinner} alt="로딩중" width="100px" />
      </LogingBackground>
    </>
  );
};

const LodingOverlay = styled.div`
  background-color: ${props => props.theme.style.backgroundWhite};
  width: 100vw;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;
const LogingBackground = styled.div`
  ${props => props.theme.variables.flex};
  margin-top: 300px;
`;

export default KakaoLogin;
