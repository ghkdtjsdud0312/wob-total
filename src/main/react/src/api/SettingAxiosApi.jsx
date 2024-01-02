// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const SettingAxiosApi = {
  // 비밀번호 변경
  passwordChange: async (email, pw) => {
    const contents = {
      email: email,
      password: pw,
    };
    console.log("email, pw : " + email, pw);
    return await customAxios.put(KH_DOMAIN + "/users/modify", contents);
  },
  // passwordChange: async (email, pw) => {
  //   const token = Common.getAccessToken();
  //   const contents = {
  //     email: email,
  //     password: pw,
  //   };
  //   console.log("email, pw : " + email, pw, token);
  //   return await axios.put(KH_DOMAIN + "/users/modify", contents, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // 회원 탈퇴 이유 DB에 추가
  withdrawal: async (email, withdrawal) => {
    const contents = {
      email: email,
      withdrawal: withdrawal,
    };
    return await customAxios.put(KH_DOMAIN + "/users/modify", contents);
  },
  // 회원 활성화 비활성화
  withdrawalInactive: async (email) => {
    const data = {
      email: email,
    };
    return await customAxios.put(KH_DOMAIN + `/setting/state`, data);
  },
  // withdrawal: async (email, withdrawal) => {
  //   const token = Common.getAccessToken();
  //   const contents = {
  //     email: email,
  //     withdrawal: withdrawal,
  //   };
  //   return await axios.put(KH_DOMAIN + "/users/modify", contents, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // 제 3자 로그인 정보 가져오기
  socialType: async (email) => {
    const contents = {
      email: email,
    };
    return await customAxios.get(
      KH_DOMAIN + `/users/detail/${email}`,
      contents
    );
  },
  // socialType: async (email) => {
  //   const token = Common.getAccessToken();
  //   const contents = {
  //     email: email,
  //   };
  //   return await axios.get(KH_DOMAIN + "/users/modify", contents, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // chatList: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + "/chat/list", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 자유 채팅방 목록 보기 (postId 없음)
  freeChatList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/freeList");
  },
  // freeChatList: async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + "/chat/freeList", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    console.log("roomId : " + roomId);
    return await customAxios.get(KH_DOMAIN + `/chat/room/${roomId}`);
  },
  // chatDetail: async (roomId) => {
  //   const accessToken = Common.getAccessToken();
  //   console.log("roomId : " + roomId);
  //   return await axios.get(KH_DOMAIN + `/chat/room/${roomId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 게시글 채팅방 생성
  chatCreate: async (name, postId) => {
    const chat = {
      name: name,
      postId: postId,
    };
    return await customAxios.post(KH_DOMAIN + "/chat/new", chat);
  },
  // chatCreate: async (name, postId) => {
  //   const accessToken = Common.getAccessToken();
  //   const chat = {
  //     name: name,
  //     postId: postId,
  //   };
  //   return await axios.post(KH_DOMAIN + "/chat/new", chat, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 자유 채팅방 생성
  freeChatCreate: async (name) => {
    const chat = {
      name: name,
    };
    return await customAxios.post(KH_DOMAIN + "/chat/freeNew", chat);
  },
  // freeChatCreate: async (name) => {
  //   const accessToken = Common.getAccessToken();
  //   const chat = {
  //     name: name,
  //   };
  //   return await axios.post(KH_DOMAIN + "/chat/freeNew", chat, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // 이전 채팅 가져오기
  recentChatLoad: async (roomId) => {
    return await customAxios.get(KH_DOMAIN + `/chat/message/${roomId}`);
  },
  // recentChatLoad: async (roomId) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/chat/message/${roomId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },

  // post에 roomId 추가
  postAddRoomId: async (postId, roomId) => {
    const contents = {
      id: postId,
      roomId: roomId,
    };
    return await customAxios.put(KH_DOMAIN + "/chat/modify", contents);
  },
  // postAddRoomId: async (postId, roomId) => {
  //   const token = Common.getAccessToken();
  //   const contents = {
  //     id: postId,
  //     roomId: roomId,
  //   };
  //   return await axios.put(KH_DOMAIN + "/chat/modify", contents, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // postId로 게시글 상세 조회
  postListById: async (postId) => {
    console.log("호출됨!!");
    return await customAxios.get(KH_DOMAIN + `/chat/postListById/${postId}`);
  },
  // postListById: async (postId) => {
  //   console.log("호출됨!!");
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/chat/postListById/${postId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },
  // 결제내역 페이지네이션 조회
  paymentPageList: async (email, page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/detail/page?email=${email}&page=${page}&size=${size}`
    );
  },
  // 결제내역 페이지 수 조회
  paymentPage: async (email, page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/detail/count?email=${email}&page=${page}&size=${size}`
    );
  },

  // 게시글 채팅방 목록 보기 (postId 있음)
  roomList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/list");
  },

  // 채팅 내역 전체 조회
  chatList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/chatList");
  },

  // 채팅 내역 삭제
  chatDelete: async (id) => {
    return await customAxios.delete(KH_DOMAIN + `/chat/delChat/${id}`);
  },

  // 채팅방 삭제
  roomDelete: async (roomId) => {
    return await customAxios.delete(KH_DOMAIN + `/chat/delRoom/${roomId}`);
  },

  // 채팅 내역 활성화 / 비활성화
  stateChat: async (id, active) => {
    const data = {
      id: id,
      active: active,
    };
    return await customAxios.put(KH_DOMAIN + `/chat/stateChat`, data);
  },
  // 채팅방 활성화 / 비활성화
  stateRoom: async (roomId, active) => {
    const data = {
      roomId: roomId,
      active: active,
    };
    return await customAxios.delete(KH_DOMAIN + `/chat/stateRoom`, data);
  },
};
export default SettingAxiosApi;
