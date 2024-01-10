import { KH_DOMAIN } from "../utils/Common";
import axios from "axios";

const KakaoAxiosApi = {
  // 카카오 로그인 BackEnd에게 카카오 엑세스 토큰을 넘겨줌
  kakaoLogin: async (data) => {
    console.log("kakaoLogin", data);
    return await axios.post(KH_DOMAIN + "/kakao/login", data);
  },
};
export default KakaoAxiosApi;
