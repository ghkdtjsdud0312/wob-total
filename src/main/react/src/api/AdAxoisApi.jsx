import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";
import customAxios from "./Interceptors";

const AdAxiosApi = {
  // 광고 등록
  adSubmit: async (props, postId) => {
    const token = Common.getAccessToken();
    const userEmail = localStorage.getItem("email");

    const ad = {
      postId: postId,
      image: props.image,
      period: props.period,
      fee: props.fee,
    };
    console.log("광고 등록 : ", postId, ad.image, ad.period, ad.fee);
    return await customAxios.post(KH_DOMAIN + `/ad/new/${postId}`, ad);
  },
};

export default AdAxiosApi;
