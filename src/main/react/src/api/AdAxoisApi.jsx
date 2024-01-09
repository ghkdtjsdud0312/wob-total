// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";

const MyPageAxiosApi = {
  //회원 전체 조회
  userGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/list`);
  },

  // Member Get One - 회원정보 상세 조회
  userGetOne: async (email) => {
    console.log("회원정보 사용자 이메일 :", email);
    return await customAxios.get(KH_DOMAIN + `/users/detail/${email}`);
  },

  // 내일정 추가 API 호출
  join: async (email, postId) => {
    try {
      console.log("엑시오스 이메일과 포스트아이디:", email, postId);
      return await customAxios.post(`${KH_DOMAIN}/schedule/join`, {
        userEmail: email,
        postId: postId,
      }); // API 호출 성공 시 반환된 데이터
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error; // API 호출 실패 시 에러 처리
    }
  },

  //스케줄 userId 확인하기
  getScheduleByEmail: async (email) => {
    try {
      console.log("사용자 이메일을 기반으로 일정 조회 중...", email);
      return await customAxios.get(KH_DOMAIN + `/schedule/user/`, {
        userEmail: email,
      });
    } catch (error) {
      console.error("일정 조회 중 에러 발생:", error);
      throw error;
    }
  },

  // 사용자가 추가한 일정들을 불러오는 API
  joinList: async (userEmail) => {
    console.log("엑시오스 이메일 뜸? :", userEmail);
    return await customAxios.get(KH_DOMAIN + `/schedule/user/${userEmail}`);
  },

  // getMatchingPosts API (수정)
  getMatchingPosts: async (postIdList) => {
    try {
      console.log("매칭되는 포스트를 가져오는 중...");
      // 여기서 postIdList는 postId들의 배열입니다.
      const joinedPostIds = postIdList.join(","); // 배열을 문자열로 변환
      return await customAxios.get(
        KH_DOMAIN + `/post/matching/${joinedPostIds}`
      );
    } catch (error) {
      console.error("매칭되는 포스트를 가져오는 중 에러 발생:", error);
      throw error;
    }
  },

  //회원 정보 수정
  userUpdate: async (
    email,
    nickname,
    introduce,
    image,
    mbti,
    interestSports,
    interestArea
  ) => {
    const user = {
      email: email,
      nickname: nickname,
      introduce: introduce,
      image: image,
      mbti: mbti,
      interestSports: interestSports,
      interestArea: interestArea,
    };
    return await customAxios.put(KH_DOMAIN + `/users/modify`, user);
  },
};

export default MyPageAxiosApi;
