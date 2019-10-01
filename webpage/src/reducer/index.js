import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import isLogged from './isLogged'
import menuReducer from "./menu";

const reducer = combineReducers({
    category: categoryReducer,
    isLogged,
    menu:menuReducer
})

export default reducer