// 관리자 페이지 axiosApi
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";

const AdminAxiosApi = {
  // 지도 키워드 검색
  mapSearch: async (name) => {
    return await customAxios.get(KH_DOMAIN + `/post/search?keyword=${name}`);
  },

  //회원 전체 조회
  userGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/list`);
  },

  // 회원 삭제
  userDelete: async (email) => {
    return await customAxios.delete(KH_DOMAIN + `/users/delete/${email}`);
  },

  // 회원 페이지네이션 조회
  userPageList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/users/list/page?page=${page}&size=${size}`
    );
  },

  // 회원 페이지 수 조회
  userPageCount: async (page, size) => {
    return await customAxios.get(KH_DOMAIN + `/users/count`);
  },

  // 회원 활성화 바활성화 처리(get)-userController
  userInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/users/allList`);
  },

  // 회원 활성화 비활성화(post)-AdminActiveController
  userListState: async (id, state) => {
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      id: id,
      active: state,
    };
    return await customAxios.put(KH_DOMAIN + `/users/state`, data);
  },

  // 종목 등록
  categorySave: async (name, img, logo) => {
    console.log("name : " + name);
    console.log("img : " + img);
    console.log("logo : " + logo);

    const category = {
      name: name,
      image: img,
      logo: logo,
    };
    return await customAxios.post(KH_DOMAIN + "/category/add", category);
  },

  // 종목 조회
  boardList: async () => {
    return await customAxios.get(KH_DOMAIN + "/category/list");
  },

  // 종목 삭제
  boardDelete: async (categoryId) => {
    return await customAxios.delete(
      KH_DOMAIN + `/category/delete/${categoryId}`
    );
  },

  // 종목 페이지네이션 조회
  boardPageList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/category/list/page?page=${page}&size=${size}`
    );
  },

  // 종목 페이지 수 조회
  boardPageCount: async (page, size) => {
    return await customAxios.get(KH_DOMAIN + `/category/count`);
  },

  // 종목 목록 활성화 바활성화 처리(get)-categoryController
  categoryInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/category/allList`);
  },

  // 게시판 활성화 비활성화(post)-AdminActiveController
  categoryListState: async (id, state) => {
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      categoryId: id,
      active: state,
    };
    return await customAxios.put(KH_DOMAIN + `/category/state`, data);
  },

  //광고 전체 조회
  adList: async () => {
    return await customAxios.get(KH_DOMAIN + `/ad/list`);
  },

  // 광고 페이지네이션 조회
  adPageList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/ad/list/page?page=${page}&size=${size}`
    );
  },

  // 광고 페이지 수 조회
  adPageCount: async (page, size) => {
    return await customAxios.get(KH_DOMAIN + `/ad/count`);
  },

  // 광고 활성화 바활성화 처리(get)
  adInfoGet: async () => {
    return await customAxios.get(KH_DOMAIN + `/ad/allList`);
  },

  // 광고 활성화 비활성화(post)
  adListState: async (id, state) => {
    console.log("활성화 비활성화, id : ", id, state);
    const data = {
      id: id,
      active: state,
    };
    return await customAxios.put(KH_DOMAIN + `/ad/state`, data);
  },

  // 광고 삭제
  adDelete: async (id) => {
    return await customAxios.delete(KH_DOMAIN + `/ad/delete/${id}`);
  },
};

export default AdminAxiosApi;
