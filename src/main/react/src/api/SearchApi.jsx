import customAxios from "./Interceptors";
import axios from "axios";
import Common, { KH_DOMAIN } from "../utils/Common";

const SearchApi = {
    searchTitle: async (props) => {
        return await axios.get(KH_DOMAIN + `/post/searchtitle?keyword=${props}`);
    },
    searchIntroduction: async (props) => {
        return await axios.get(
            KH_DOMAIN + `/post/searchintroduction?keyword=${props}`
        );
    },
};
export default SearchApi;