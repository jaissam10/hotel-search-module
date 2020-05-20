import { combineReducers } from "redux";
import authData from "./auth";
import cityListData from "./city-list";
import nationalityListData from "./nationality-list";

export default combineReducers({
    authData,
    cityListData,
    nationalityListData
})