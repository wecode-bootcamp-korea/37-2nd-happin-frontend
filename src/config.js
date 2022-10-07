const BASE_URL = "http://10.58.5.151:8000";
export const GET_PRODUCT_API = `${BASE_URL}/products`;

export const GET_INTEREST_INFO = `${BASE_URL}/user/interest`;

export const POST_INTEREST_INFO = `${BASE_URL}/main/interest`;

export const accessToken = localStorage.getItem("token");
