import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";
import customAxios from "./Interceptors";

const AdAxiosApi = {
  // 광고 등록
  adSubmit: async (postId, props) => {
    const userEmail = localStorage.getItem("email");

    const ad = {
      postId: postId,
      image: props.url,
      period: props.period,
      fee: props.fee,
      postingDate: props.postingDate,
    };
    console.log(
      "광고 등록 !!! : ",
      postId,
      ad.image,
      ad.period,
      ad.fee,
      ad.postingDate
    );
    console.log("postId 형태 확인: ", typeof postId);
    console.log("ad 형태 확인: ", typeof ad);
    return await customAxios.post(KH_DOMAIN + `/ad/new/${postId}`, ad);
  },
};

export default AdAxiosApi;
