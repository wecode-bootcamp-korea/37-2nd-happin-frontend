const API_KEY = process.env.REACT_APP_API_KEY;
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
export const KAKAO_OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
