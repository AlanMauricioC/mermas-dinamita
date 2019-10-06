import { combineReducers } from "redux";
import isLogged from './isLogged'
import menuReducer from "./menu";

const reducer = combineReducers({
    isLogged,
    menu:menuReducer
})

export default reducer