import { combineReducers } from "redux";
import isLogged from './isLogged'
import menuReducer from "./menu";
import supplies from "./suppliesReducer";

const reducer = combineReducers({
    isLogged,
    menu:menuReducer,
    supplies
})

export default reducer