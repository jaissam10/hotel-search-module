import axios from "axios";
import qs from 'qs';
import { CONFIG } from "../../config/config";
import store from "../store";

export const nationalityListRequest = () => {
    return async (dispatch) => {
        try {
            const {authData} = store.getState();
            dispatch({type: "NATIONALITY_LIST_REQUEST", payload: {}});
            // console.log('authData => ', authData)
            const { data: response } = await axios({
                method: "post",
                url: CONFIG.NATIONALITY_LIST_API_URL,
                headers: {
                    "Authorization": `Bearer ${authData?.payload?.access_token}` 
                },
                data: {}
            });
            // console.log("nationalityListRequest response => ", response);
            dispatch({type: "NATIONALITY_LIST_REQUEST_SUCCESS", payload: response});
        } catch(err) {
            console.log("error in nationalityListRequest => ", err);
            dispatch({type: "NATIONALITY_LIST_REQUEST_ERROR", payload: {message: "Something went wrong"}});
        }
    }
}
