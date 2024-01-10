import customAxios from "./Interceptors";
import axios from "axios";
import Common, { KH_DOMAIN } from "../utils/Common";

const SearchAxiosApi = {
  searchTitle: async (keyword, page, size) => {
    return await axios.get(
      KH_DOMAIN +
        `/post/searchtitle?keyword=${keyword}&page=${page}&size=${size}&sort=title`
    );
  },
  searchIntroduction: async (keyword, page, size) => {
    return await axios.get(
      KH_DOMAIN +
        `/post/searchintroduction?keyword=${keyword}&page=${page}&size=${size}&sort=Introduction`
    );
  },
  // searchTitle: async (props) => {
  //   return await axios.get(KH_DOMAIN + `/post/searchtitle?keyword=${props}`);
  // },
  // searchIntroduction: async (props) => {
  //   return await axios.get(
  //     KH_DOMAIN + `/post/searchintroduction?keyword=${props}`
  //   );
  // },
};
export default SearchAxiosApi;

// keyword=example&page=0&size=10&sort=title,asc
