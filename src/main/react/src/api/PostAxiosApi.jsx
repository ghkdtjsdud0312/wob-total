// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const PostAxiosApi = {
  // 일정 등록
  postSubmit: async (props) => {
    const userEmail = localStorage.getItem("email");
    console.log(props.cost);

    const post = {
      title: props.title,
      categoryName: props.seletedCategory,
      local: props.local,
      place: props.place,
      people: props.people,
      fee: props.cost,
      introduction: props.detail,
      date: props.date,
      time: props.time,
      userEmail: userEmail,
      type: props.type,
      image: props.file,
      latitude: props.lat,
      longitude: props.lng,
    };
    console.log(
      "일정 등록 : ",
      post.title,
      post.categoryName,
      post.local,
      post.place,
      post.people,
      post.fee,
      post.introduction,
      post.date,
      post.time,
      post.email,
      post.type,
      post.file,
      post.latitude,
      post.longitude
    );
    return await customAxios.post(KH_DOMAIN + "/post/new", post);
  },

  // 강사 정보 user 테이블에 보내기
  userInfoSubmit: async (props) => {
    const token = Common.getAccessToken();
    const info = {
      email: localStorage.getItem("email"),
      name: props.user,
      phoneNumber: props.phoneNumber,
    };
    return await customAxios.post(KH_DOMAIN + "/teacherinfo", info);
  },

  // 게시글 전체 조회
  postListAll: async () => {
    return await customAxios.get(KH_DOMAIN + "/post/list");
  },

  // 카테고리 목록 활성화만 조회
  categoryList: async () => {
    return await customAxios.get(KH_DOMAIN + "/category/listactive");
  },

  // post에 roomId 추가
  postAddRoomId: async (postId, roomId) => {
    const contents = {
      id: postId,
      roomId: roomId,
    };
    return await customAxios.put(KH_DOMAIN + "/chat/modify", contents);
  },

  // postId로 게시글 상세 조회
  postListById: async (postId) => {
    console.log("호출됨!!");
    return await customAxios.get(KH_DOMAIN + `/post/postListById/${postId}`);
  },

  // postId로 장소만 가져오기
  postAddressById: async (postId) => {
    console.log("장소!!!");
    return await customAxios.get(
      KH_DOMAIN + `/post/postPlaceAddress/${postId}`
    );
  },

  // 회원의 이름, 전화번호 가져오기
  getPostUserInfo: async (email) => {
    return await customAxios.get(KH_DOMAIN + `/getTeacherInfo/${email}`);
  },
};

export default PostAxiosApi;

// const PostAxiosApi = {
//   // 일정 등록
//   postSubmit: async (props) => {
//     const token = Common.getAccessToken();
//     const userEmail = localStorage.getItem("email");
//     console.log(props.cost);

//     const post = {
//       title: props.title,
//       categoryName: props.seletedCategory,
//       local: props.local,
//       place: props.place,
//       people: props.people,
//       fee: props.cost,
//       introduction: props.detail,
//       date: props.date,
//       time: props.time,
//       userEmail: userEmail,
//       type: props.type,
//       image: props.url,
//     };
//     console.log(
//       "일정 등록 : ",
//       post.title,
//       post.categoryName,
//       post.local,
//       post.place,
//       post.people,
//       post.fee,
//       post.introduction,
//       post.date,
//       post.time,
//       post.email,
//       post.type,
//       post.url
//     );
//     return await axios.post(KH_DOMAIN + "/post/new", post, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });
//   },

//   // 게시글 전체 조회
//   postListAll: async () => {
//     const token = Common.getAccessToken();
//     return await axios.get(KH_DOMAIN + "/post/list", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });
//   },

//   // 카테고리 목록 활성화만 조회
//   categoryList: async () => {
//     const token = Common.getAccessToken();
//     return await axios.get(KH_DOMAIN + "/category/listactive", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });
//   },
//   // post에 roomId 추가
//   postAddRoomId: async (postId, roomId) => {
//     const token = Common.getAccessToken();
//     const contents = {
//       id: postId,
//       roomId: roomId,
//     };
//     return await axios.put(KH_DOMAIN + "/chat/modify", contents, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });
//   },
//   // postId로 게시글 상세 조회
//   postListById: async (postId) => {
//     console.log("호출됨!!");
//     const accessToken = Common.getAccessToken();
//     return await axios.get(KH_DOMAIN + `/post/postListById/${postId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + accessToken,
//       },
//     });
//   },

//   // postId로 장소만 가져오기
//   postAddressById: async (postId) => {
//     console.log("장소!!!");
//     const accessToken = Common.getAccessToken();
//     return await axios.get(KH_DOMAIN + `/post/postPlaceAddress/${postId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + accessToken,
//       },
//     });
//   },
// };

// export default PostAxiosApi;
