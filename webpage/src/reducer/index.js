import { combineReducers } from "redux";
import isLogged from './isLogged'
import menuReducer from "./menu";
import supplies from "./suppliesReducer";
import recipes from "./recipesReducer";

const reducer = combineReducers({
    isLogged,
    menu:menuReducer,
    supplies,
    recipes,
})

export default reducer