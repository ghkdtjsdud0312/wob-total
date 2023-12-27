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

  //내일정추가
  join: async (email, postId) => {
    console.log("엑시오스 이메일과 포스트아이디:", email, postId);
    return await customAxios.post(KH_DOMAIN + `/schedule/join`, {
      userEmail: email,
      postId: postId,
    });
  },

  // 사용자가 추가한 일정들을 불러오는 API
  joinList: async (userEmail) => {
    console.log("엑시오스 이메일 뜸? :", userEmail);
    return await customAxios.get(KH_DOMAIN + `/post/user/${userEmail}`);
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
    console.log(
      "axios 회원정보 수정 업데이트 하기 : ",
      email,
      nickname,
      introduce,
      image,
      mbti,
      interestSports,
      interestArea
    );
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
  // userUpdate: async (
  //   email,
  //   nickname,
  //   introduce,
  //   image,
  //   mbti,
  //   interestSports,
  //   interestArea
  // ) => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   console.log(
  //     "axios 회원정보 수정 업데이트 하기 : ",
  //     email,
  //     nickname,
  //     introduce,
  //     image,
  //     mbti,
  //     interestSports,
  //     interestArea
  //   );
  //   const user = {
  //     email: email,
  //     nickname: nickname,
  //     introduce: introduce,
  //     image: image,
  //     mbti: mbti,
  //     interestSports: interestSports,
  //     interestArea: interestArea,
  //   };
  //   return await axios.put(KH_DOMAIN + `/users/modify`, user, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },
};

export default MyPageAxiosApi;
