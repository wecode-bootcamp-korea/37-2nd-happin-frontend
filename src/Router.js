import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import MyPage from "./pages/MyPage/MyPage";
import Nav from "./components/Nav/Nav";
import KakaoLogin from "./pages/Login/KakaoLogin.jsx";
import Interest from "../src/pages/Interest/Interest";
import PinBuilder from "./pages/PinBuilder/PinBuilder";
import Detail from "./pages/Detail/Detail";

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
        <Route path="/my-page/:id" element={<MyPage />} />
        <Route path="/pin-builder" element={<PinBuilder />} />
        <Route path="/detail/:pinId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
