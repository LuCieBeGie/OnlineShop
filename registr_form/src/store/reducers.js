import { combineReducers } from "redux";
import { myCartReducer } from "./Cart/reducer";
import { prodReducer } from "./Product/reducer";
import { userReducer } from "./User/reducer";

export default combineReducers({
    userState: userReducer,
    prodState: prodReducer,
    cartState: myCartReducer
})