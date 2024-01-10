import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용

export const KH_DOMAIN = "";
export const KH_SOCKET_URL = "wss://mytestpagehanbi.store/ws/chat";

export const timeFromNow = (timestamp) => {
  return moment(timestamp).fromNow();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

const Common = {
  KAKAOKEY: "2dda918f299fb6e8325412499bf9a08a",
  // 지도 주소 -> 위도 경도로 바꿈
  getAddrCoordination: async (addr) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${addr}`,
        {
          headers: {
            Authorization: `KakaoAK ${Common.KAKAOKEY}`,
          },
        }
      );

      const result = response.data;
      if (result.documents.length > 0) {
        const firstResult = result.documents[0];
        console.log(firstResult);
        console.log(firstResult.address);
        console.log(firstResult.address.y);
        console.log(firstResult.address.x);
        const { x, y } = firstResult.address;
        return { latitude: y, longitude: x };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },
  setEmail: (email) => {
    localStorage.setItem("email", email);
  },
  getEmail: () => {
    return localStorage.getItem("email");
  },
  setSocialId: (socialId) => {
    localStorage.setItem("socialId", socialId);
  },
  getSocialId: () => {
    return localStorage.getItem("socialId");
  },
  clearLocalStorage: () => {
    localStorage.clear();
  },

  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    const refreshToken = Common.getRefreshToken();

    try {
      const response = await axios.get(KH_DOMAIN + "/refresh", {
        headers: {
          "Content-Type": "application/json",
          "Authorization-refresh": "Bearer " + refreshToken,
        },
      });
      // console.log("Common의 refreshToken : ", refreshToken);
      // console.log("Common의 response", response);
      // 여기서 서버에서 새로 발급받은 Access Token을 받아와서 저장하거나 다른 작업을 수행할 수 있습니다.
      const newAccessToken = response.headers.get("authorization");
      const newRefreshToken = response.headers.get("authorization-refresh");
      console.log("new accessToken return  : ", newAccessToken);
      console.log("new refreshToken return : ", newRefreshToken);
      Common.setAccessToken(newAccessToken);
      Common.setRefreshToken(newRefreshToken);

      return newAccessToken;

      // 이후 실패한 요청 재시도 또는 다른 작업 수행
      // ...
    } catch (error) {
      // Refresh Token을 통한 재인증이 실패한 경우
      // 에러 처리 로직
      console.error("Refresh Token을 통한 재인증이 실패했습니다.", error);
    }
  },
};

export default Common;
