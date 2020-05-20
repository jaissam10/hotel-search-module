import axios from "axios";
import qs from 'qs';
import { CONFIG } from "../../config/config";
import store from "../store";

export const cityListRequest = (value) => {
    return async (dispatch) => {
        try {
            const {authData} = store.getState();
            dispatch({type: "CITY_LIST_REQUEST", payload: {}});
            // console.log('authData => ', authData)
            const { data: response } = await axios({
                method: "post",
                url: CONFIG.CITY_LIST_API_URL,
                headers: {
                    "Authorization": `Bearer ${authData.payload.access_token}` 
                },
                data: {
                    searchItem: value
                }
            });
            // console.log("cityListRequest response => ", response);
            dispatch({type: "CITY_LIST_REQUEST_SUCCESS", payload: response});
        } catch(err) {
            console.log("error in cityListRequest => ", err);
            dispatch({type: "CITY_LIST_REQUEST_ERROR", payload: {message: "Something went wrong"}});
        }
    }
}
