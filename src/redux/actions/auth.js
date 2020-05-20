import axios from "axios";
import qs from 'qs';
import { CONFIG } from "../../config/config";

export const authRequest = () => {
    return async (dispatch) => {
        try {
            dispatch({type: "AUTH_REQUEST", payload: {}});
            let requestData = {
                client_id: "4s3b9f099keqs518398tenlp62",
                grant_type: "client_credentials",
                scope: "services/all"
            }
            const { data: response } = await axios({
                method: "post",
                url: CONFIG.AUTH_API_URL,
                headers: { 
                    "content-type": "application/x-www-form-urlencoded", 
                    "Authorization": `Basic ${CONFIG.BASIC_AUTH_TOKEN}` 
                },
                data: qs.stringify(requestData)
            });
            // console.log("authRequest response => ", response);
            dispatch({type: "AUTH_REQUEST_SUCCESS", payload: response});
        } catch(err) {
            console.log("error in changePasswordRequest => ", err);
            dispatch({type: "AUTH_REQUEST_ERROR", payload: {message: "Something went wrong"}});
        }
    }
}

export const authReset = () => {
    return async (dispatch) => {
        dispatch({type: "AUTH_RESET"});
    }
}