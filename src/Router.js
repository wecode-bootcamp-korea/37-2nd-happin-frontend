import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import MyPage from "./pages/MyPage/MyPage";
import Nav from "./components/Nav/Nav";
import KakaoLogin from "./pages/Login/KakaoLogin";
import Interest from "../src/pages/Interest/Interest";

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/interest" element={<Interest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
