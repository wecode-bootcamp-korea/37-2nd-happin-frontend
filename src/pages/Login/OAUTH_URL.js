const API_KEY = process.env.REACT_APP_API_KEY; //보안으로 민감 github에 올라가면 안됨 src폴더에 ignore에 올리기
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
export const KAKAO_OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
