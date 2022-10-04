import React from "react";
import { useLocation } from "react-router-dom";

const Main = () => {
  const { state } = useLocation();
  // console.log(state);
  console.log(`api주소?search=${state}`);
  return <div>Hi, I'm Main.</div>;
};

export default Main;
