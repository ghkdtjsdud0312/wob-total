// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const PaymentAxiosApi = {
  // 결제 내역 저장
  payAdd: async (
    merchant_uid,
    userName,
    userPhone,
    userEmail,
    fee,
    postTitle,
    postUserName,
    postPhoneNum
  ) => {
    const payment = {
      userEmail: userEmail,
      phoneNum: userPhone,
      userName: userName,
      fee: fee,
      orderNum: merchant_uid,
      postTitle: postTitle,
      postUserName: postUserName,
      postPhoneNum: postPhoneNum,
    };
    return await customAxios.post(KH_DOMAIN + "/pay/add", payment);
  },
  // payAdd: async (
  //   merchant_uid,
  //   userName,
  //   userPhone,
  //   userEmail,
  //   fee,
  //   postTitle,
  //   postUserName,
  //   postPhoneNum
  // ) => {
  //   const token = Common.getAccessToken();
  //   const payment = {
  //     userEmail: userEmail,
  //     phoneNum: userPhone,
  //     userName: userName,
  //     fee: fee,
  //     orderNum: merchant_uid,
  //     postTitle: postTitle,
  //     postUserName: postUserName,
  //     postPhoneNum: postPhoneNum,
  //   };
  //   return await axios.post(KH_DOMAIN + "/pay/add", payment, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // 전체 결제 내역 불러오기
  payGet: async () => {
    return await customAxios.get(KH_DOMAIN + "/pay/all");
  },
  // payGet: async () => {
  //   const token = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + "/pay/all", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },

  // userId에 따른 결제 내역 불러오기
  payGetById: async (paymentId) => {
    return await customAxios.get(KH_DOMAIN + `/pay/detail/${paymentId}`);
  },
  // payGetById: async (paymentId) => {
  //   const token = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/pay/detail/${paymentId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },
  // email에 따른 결제 내역 불러오기
  payGetByEmail: async (email) => {
    return await customAxios.get(KH_DOMAIN + `/pay/detail/${email}`);
  },
  // payGetByEmail: async (email) => {
  //   const token = Common.getAccessToken();
  //   return await axios.get(KH_DOMAIN + `/pay/detail/${email}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },
};
export default PaymentAxiosApi;
