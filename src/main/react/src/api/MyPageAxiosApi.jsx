import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";

const MyPageAxiosApi = {
  userGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/list`);
  },

  userGetOne: async (email) => {
    return await customAxios.get(KH_DOMAIN + `/users/detail/${email}`);
  },

  join: async (email, postId) => {
    try {
      return await customAxios.post(`${KH_DOMAIN}/schedule/join`, {
        userEmail: email,
        postId: postId,
      });
    } catch (error) {
      throw error; // API 호출 실패 시 에러 처리
    }
  },

  getScheduleByEmail: async (email) => {
    try {
      return await customAxios.get(KH_DOMAIN + `/schedule/user/`, {
        userEmail: email,
      });
    } catch (error) {
      console.error("일정 조회 중 에러 발생:", error);
      throw error;
    }
  },

  joinList: async (userEmail) => {
    return await customAxios.get(KH_DOMAIN + `/schedule/user/${userEmail}`);
  },

  getMatchingPosts: async (postIdList) => {
    try {
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
