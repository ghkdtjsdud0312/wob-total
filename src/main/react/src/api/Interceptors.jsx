import axios from "axios";
import Common from "../utils/Common";

const customAxios = axios.create();

// Axios 요청 인터셉터
customAxios.interceptors.request.use(
  async (config) => {
    const accessToken = Common.getAccessToken();

    // 요청 헤더에 액세스 토큰 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // /login 또는 /sign-up에 대한 특별한 처리
    if (config.url === "/login" || config.url === "/sign-up") {
      // 여기에 추가적인 로직을 구현하거나 헤더를 제거하는 등의 처리를 할 수 있습니다.
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios 응답 인터셉터
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 응답이 401 Unauthorized일 때
    // console.log("error", error);
    // console.log("error.response", error.response);
    if (error.response && error.response.status === 401) {
      // 리프레시 토큰을 사용하여 액세스 토큰 갱신
      const refreshedAccessToken = await Common.handleUnauthorized();
      // console.log(
      //   "refreshedAccessToken : ",
      //   refreshedAccessToken
      // );
      // Common.setAccessToken(refreshedAccessToken);

      // 갱신이 성공했다면 다시 원래의 요청을 시도
      if (refreshedAccessToken) {
        return customAxios(error.config);
      }
    }

    // 다른 에러 처리
    return Promise.reject(error);
  }
);

export default customAxios;
