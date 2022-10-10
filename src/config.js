const BASE_URL = "http://10.58.5.151:8000";
export const accessToken = localStorage.getItem("token");

export const API = {
  LOGIN: `${BASE_URL}/user/signin`,
  GET_INTEREST: `${BASE_URL}/user/interest`,
  POST_INTEREST: `${BASE_URL}/main/interest`,
  MAIN: `${BASE_URL}/main`,
  DETAIL: `${BASE_URL}/get`,
  BOARD: `${BASE_URL}/boards`,
  MYPAGE: `${BASE_URL}/profile/stored`,
  POST_DETAIL: `${BASE_URL}/storing/`,
};

export const GET_PRODUCT_API = `${BASE_URL}/products`;
export const GET_INTEREST_INFO = `${BASE_URL}/user/interest`;
export const POST_INTEREST_INFO = `${BASE_URL}/main/interest`;
};

//export const GET_DETAIL_API = `${BASE_URL}/`;
