const BASE_URL = "http://10.58.52.214:8000";
export const accessToken = localStorage.getItem("token");

export const API = {
  LOGIN: `${BASE_URL}/user/kakao-signin `,
  GET_INTEREST: `${BASE_URL}/user/interest`,
  POST_INTEREST: `${BASE_URL}/main/interest`,
  MAIN: `${BASE_URL}/main`,
  DETAIL: `${BASE_URL}/pin`,
  BOARD: `${BASE_URL}/boards`,
  MYPAGE: `${BASE_URL}/profile/stored`,
  POST_DETAIL: `${BASE_URL}/storing`,
  MAKED_PIN: `${BASE_URL}/pin`,
  GET_PIN: `${BASE_URL}/profile/created`,
};
